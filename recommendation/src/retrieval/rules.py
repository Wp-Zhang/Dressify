import pandas as pd
import numpy as np
from abc import ABC, abstractmethod
from typing import List
import math

# * scores of rules are the bigger the better


class PersonalRetrieveRule(ABC):
    """Use certain rules to respectively retrieve items for each customer."""

    @abstractmethod
    def retrieve(self) -> pd.DataFrame:
        """Retrieve items

        Returns:
            pd.DataFrame: (customer_id, product_code, method, score)
        """


class GlobalRetrieveRule(ABC):
    """Use certain rules to retrieve items for all customers."""

    def merge(self, result: pd.DataFrame):
        result = result[[self.iid, "method", "score"]]

        num_item = result.shape[0]
        num_user = self.customer_list.shape[0]

        tmp_user = np.repeat(self.customer_list, num_item)
        tmp_df = result.iloc[np.tile(np.arange(num_item), num_user)]
        tmp_df = tmp_df.reset_index(drop=True)
        tmp_df["customer_id"] = tmp_user

        return tmp_df

    @abstractmethod
    def retrieve(self) -> pd.DataFrame:
        """Retrieve items

        Returns:
            pd.DataFrame: (product_code, method, score)
        """


# * ======================= Personal Retrieve Rules ======================= *


class OrderHistory(PersonalRetrieveRule):
    """Retrieve recently bought items by the customer."""

    def __init__(
        self,
        trans_df: pd.DataFrame,
        days: int = 7,
        n: int = None,
        name: int = 1,
        item_id: str = "product_code",
    ):
        """Initialize OrderHistory.

        Parameters
        ----------
        trans_df : pd.DataFrame
            Dataframe of transaction records.
        days : int, optional
            Length of time window when getting user buying history, by default ``7``.
        n : int, optional
            Get top `n` recently bought items, by default ``None``.
        name : str, optional
            Name of the rule, by default ``1``.
        item_id : str, optional
            Name of item id, by default ``"product_code"``.
        """
        self.iid = item_id
        self.trans_df = trans_df[["t_dat", "customer_id", item_id]]
        self.days = days
        self.n = n
        self.name = name

    def retrieve(self) -> pd.DataFrame:
        df = self.trans_df.reset_index()
        df["t_dat"] = pd.to_datetime(df["t_dat"])

        tmp = df.groupby("customer_id").t_dat.max().reset_index()
        tmp.columns = ["customer_id", "max_dat"]
        res = df.merge(tmp, on=["customer_id"], how="left")

        res["diff_dat"] = (res.max_dat - res.t_dat).dt.days
        res = res.loc[res["diff_dat"] < self.days].reset_index(drop=True)

        res = res.sort_values(by=["diff_dat"], ascending=True).reset_index(drop=True)
        res = res.groupby(["customer_id", self.iid], as_index=False).first()

        res = res.reset_index()
        res = res.sort_values(by="index", ascending=False).reset_index(drop=True)
        res["rank"] = res.groupby(["customer_id"])["index"].rank(
            ascending=True, method="first"
        )
        res["score"] = -res["diff_dat"]

        if self.n is not None:
            res = res.loc[res["rank"] <= self.n]

        res["method"] = self.name
        res = res[["customer_id", self.iid, "score", "method"]]

        return res


class ItemPair(PersonalRetrieveRule):
    """Customers who bought this often bought this."""

    def __init__(
        self, trans_df: pd.DataFrame, name: int = 1, item_id: str = "product_code"
    ):
        """Initialize ItemPair.

        Parameters
        ----------
        trans_df : pd.DataFrame
            Dataframe of transaction records.
        name: str, optional
            Name of the rule, by default ``1``.
        item_id : str, optional
            Name of item id, by default ``"product_code"``.
        """
        self.iid = item_id
        self.trans_df = trans_df[["customer_id", self.iid]].drop_duplicates()
        self.name = name

    def _get_freq_pair(self) -> pd.DataFrame:
        """Generate dict of frequent item pairs in target transaction dataframe.

        Returns
        -------
        pd.DataFrame
            Frequent item pairs.
        """
        df = self.trans_df
        df2 = df.rename(columns={self.iid: "pair"})

        pair = df.merge(df2, on="customer_id")
        pair = pair[pair[self.iid] != pair["pair"]]
        pair["count"] = 1
        pair = pair.groupby([self.iid, "pair"])["count"].sum().reset_index()
        pair = pair.sort_values("count", ascending=False).reset_index(drop=True)
        pair = pair.groupby(self.iid).first().reset_index()
        pair = pair.sort_values(by="count", ascending=False).reset_index(drop=True)
        pair["score"] = pair["count"]

        return pair

    def retrieve(self) -> pd.DataFrame:
        pair = self._get_freq_pair()

        df = self.trans_df
        df = df.merge(pair, on=self.iid, how="left")

        df = df.loc[df["pair"].notnull()]
        df = df.drop_duplicates(["customer_id", "pair"])

        df[self.iid] = df["pair"].astype("int32")
        df["method"] = self.name

        df = df[["customer_id", self.iid, "method", "score"]]
        return df


class ItemCF(PersonalRetrieveRule):
    """Item-Item Collaborative Filtering."""

    def __init__(
        self, history_df: pd.DataFrame, target_df: pd.DataFrame, top_k=20, name=1
    ):
        """Initialize ItemCF.

        Parameters
        ----------
        history_df : pd.DataFrame
            Dataframe of transaction records.
        target_df : pd.DataFrame
            Dataframe of target customer transaction records.
        top_k : int, optional
            Get top `k` similar items, by default ``20``.
        name: str, optional
            Name of the rule, by default ``1``.
        """

        self.history_df = history_df.groupby("customer_id")["product_code"].apply(list)
        self.target_df = target_df.groupby("customer_id")["product_code"].apply(list)
        self.top_k = top_k
        self.name = name

    def _item_cf(self, top_k=20):
        sim_item = {}
        item_cnt = {}

        for user in self.history_df.keys():
            items = self.history_df[user]
            for i, item in enumerate(items[:-1]):
                sim_item.setdefault(item, {})
                item_cnt[item] = item_cnt.get(item, 0) + 1
                for j, relate_item in enumerate(items):
                    if i == j:
                        continue
                    loc_alpha = 1.0 if j > i else 0.9  # * direction factor
                    loc_weight = loc_alpha * 0.7 ** (
                        abs(j - i) - 1
                    )  # * distance factor
                    sim_item[item].setdefault(relate_item, 0)
                    sim_item[item][relate_item] += loc_weight / math.log(
                        1 + len(items)
                    )  # * popularity factor

        sim_item_corr = sim_item.copy()
        for i, related_items in sim_item.items():
            sim_item_corr[i] = sorted(
                related_items.items(), key=lambda x: x[1], reverse=True
            )

        pred_next = {}
        pred_score = {}
        for item in sim_item_corr:
            if len(sim_item_corr[item]) >= 5:
                l = pred_next.get(item, [])
                l2 = pred_score.get(item, [])
                relate_items = sim_item_corr[item][:top_k]
                pred_next[item] = l + [x[0] for x in relate_items]
                pred_score[item] = l2 + [x[1] for x in relate_items]

        return pred_next, pred_score

    def _predict(self, item_dict, score_dict):
        item_cf_res = {}
        item_cf_score = {}
        for user in self.target_df.keys():
            l = item_cf_res.get(user, [])
            l2 = item_cf_score.get(user, [])
            for item in self.target_df[user]:
                if item in item_dict:
                    l += item_dict[item]
                    l2 += score_dict[item]
            item_cf_res[user] = l
            item_cf_score[user] = l2

        length = sum([len(item_cf_res[x]) for x in item_cf_res])
        candidates = np.zeros((length, 3))
        p = 0
        for uid in item_cf_res:
            tmp_items = item_cf_res[uid]
            tmp_scores = item_cf_score[uid]
            if len(tmp_items) == 0:
                continue
            candidates[p : p + len(tmp_items), 0] = uid
            candidates[p : p + len(tmp_items), 1] = tmp_items
            candidates[p : p + len(tmp_items), 2] = tmp_scores
            p += len(tmp_items)
        candidates = pd.DataFrame(
            candidates[:p], columns=["customer_id", "product_code", "score"]
        )
        candidates["method"] = self.name
        return candidates

    def retrieve(self):
        item_dict, score_dict = self._item_cf(self.top_k)
        candidates = self._predict(item_dict, score_dict)
        return candidates


# * ======================== Global Retrieve Rules ======================== *


class TimeHistory(GlobalRetrieveRule):
    """Retrieve popular items in specified time window."""

    def __init__(
        self,
        customer_list: List,
        trans_df: pd.DataFrame,
        n: int = 12,
        name: int = 1,
        unique: bool = True,
        item_id: str = "product_code",
    ):
        """Initialize TimeHistory.

        Parameters
        ----------
        customer_list : List
            List of target customer ids.
        trans_df : pd.DataFrame
            Dataframe of transaction records.
        n : int, optional
            Get top `n` popular items, by default ``12``.
        unique : bool, optional
            Whether to drop duplicate buying records, by default ``True``.
        item_id : str, optional
            Name of item id, by default ``"product_code"``.
        """
        self.iid = item_id
        self.customer_list = customer_list
        self.trans_df = trans_df[["customer_id", self.iid]]
        self.unique = unique
        self.n = n
        self.name = name

    def retrieve(self) -> List[int]:
        """Get popular items in the specified time window

        Returns:
            List[int]: top n popular items
        """
        df = self.trans_df
        if self.unique:
            df = df.drop_duplicates(["customer_id", self.iid])

        df["count"] = 1
        df = df.groupby(self.iid, as_index=False)["count"].sum()
        df = df.sort_values(by="count", ascending=False).reset_index(drop=True)
        df["rank"] = df.index + 1
        df["score"] = df["count"]
        df["method"] = self.name

        df = df[df["rank"] <= self.n][[self.iid, "score", "method"]]
        df = self.merge(df)

        return df[["customer_id", self.iid, "method", "score"]]
