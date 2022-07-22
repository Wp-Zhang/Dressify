import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let recallOrderPair;
let recallOrderCF;
let recallSale;
let itemFeature;

export default class RecDAO {
    static async injectDB(conn) {
        if (recallOrderPair && recallOrderCF && recallSale) {
            return;
        }
        try {
            recallOrderPair = await conn.db(process.env.DRESSIFY_NS).collection("recall_item_pair");
            recallOrderCF = await conn.db(process.env.DRESSIFY_NS).collection("recall_cf");
            recallSale = await conn.db(process.env.DRESSIFY_NS).collection("recall_sale");
            itemFeature = await conn.db(process.env.DRESSIFY_NS).collection("item_features");
        } catch (e) {
            console.error(`unable to connect in recDAO: ${e}`);
        }
    }

    static async recallBySale() {
        try {
            return await recallSale.find().toArray();
        } catch (e) {
            console.error(`Something went wrong in recallBySale: ${e}`);
            throw e;
        }
    }

    static async recallByPair(ids) {
        try {
            return await recallOrderPair.find({ "product_code": { $in: ids } }).toArray();
        } catch (e) {
            console.error(`Something went wrong in recallByPair: ${e}`);
            throw e;
        }
    }

    static async recallByCF(ids) {
        try {
            return await recallOrderCF.find({ "product_code": { $in: ids } }).toArray();
        } catch (e) {
            console.error(`Something went wrong in recallByCF: ${e}`);
            throw e;
        }
    }

    static async getItemFeature(ids) {
        try {
            return await itemFeature.find({ "product_code": { $in: ids } }).toArray();
        } catch (e) {
            console.error(`Something went wrong in getItemFeature: ${e}`);
            throw e;
        }
    }
}