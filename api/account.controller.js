import FavoritesDAO from '../dao/favoritesDAO.js';
import CartDAO from '../dao/cartDAO.js';
import OrdersDAO from '../dao/ordersDAO.js';
import ArticlesDAO from '../dao/articlesDAO.js';

export default class AccountController {
    static async apiUpdateFavorites(req, res, next) {
        try {
            const FavoritesResponse = await FavoritesDAO.updateFavorites(
                req.body._id,
                req.body.favorites
            )

            var { error } = FavoritesResponse
            if (error) {
                res.status(500).json({ error });
            }

            if (FavoritesResponse.modifiedCount === 0) {
                throw new Error("Unable to update favorites.");
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }


    }

    static async apiGetFavorites(req, res, next) {
        try {
            let uid = req.params.userId;
            let favorites = await FavoritesDAO.getFavoritesById(uid);
            if (!favorites) {
                res.status(404).json({ error: "user not found" });
                return
            }
            res.json(favorites);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiUpdateCart(req, res, next) {
        try {
            const CartResponse = await CartDAO.updateCart(
                req.body._id,
                req.body.cart
            )

            var { error } = CartResponse
            if (error) {
                res.status(500).json({ error });
            }

            if (CartResponse.modifiedCount === 0) {
                throw new Error("Unable to update cart.");
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }


    }

    static async apiGetCart(req, res, next) {
        try {
            let uid = req.params.userId;
            let cart = await CartDAO.getCartById(uid);
            if (!cart) {
                res.status(404).json({ error: "user not found" });
                return
            }
            res.json(cart);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }

    static async apiAddOrder(req, res, next) {
        try {
            const OrdersResponse = await OrdersDAO.addOrder(
                req.body.order
            )

            var { error } = OrdersResponse
            if (error) {
                res.status(500).json({ error });
            }

            if (OrdersResponse.modifiedCount === 0) {
                throw new Error("Unable to add order.");
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiDeleteOrder(req, res, next) {
        try {
            let order_id = req.params.orderId;
            const OrdersResponse = await OrdersDAO.deleteOrder(
                parseInt(order_id)
            )

            var { error } = OrdersResponse
            if (error) {
                res.status(500).json({ error });
            }

            if (OrdersResponse.modifiedCount === 0) {
                throw new Error("Unable to delete order.");
            }

            res.json({ status: "success" });
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetOrders(req, res, next) {
        try {
            let uid = req.params.userId;
            let orders = await OrdersDAO.getOrdersById(uid);
            if (!orders) {
                res.status(404).json({ error: "user not found" });
                return
            }
            else {
                for (let [i, order] of orders.entries()) {
                    order.article_info = []
                    for (let i = 0; i < order.article_id.length; i++) {
                        let iid = order.article_id[i]
                        let info = await ArticlesDAO.getArticleById(iid);
                        order.article_info.push(info)
                    }
                    orders[i] = order
                }
            }
            res.json(orders);
        } catch (e) {
            console.log(`API, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}