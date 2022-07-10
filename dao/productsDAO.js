import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let products;

export default class ProductsDAO {
    static async injectDB(conn) {
        if (products) {
            return;
        }
        try {
            products = await conn.db(process.env.DRESSIFY_NS).collection("products");
        } catch (e) {
            console.error(`unable to connect in ProductsDAO: ${e}`);
        }
    }

    static async getProducts({
        filters = null,
        page = 0,
        productsPerPage = 16,
    } = {}) {
        let query = {};
        if (filters) {
            if ("name" in filters) {
                query = { ...query, $text: { $search: filters['name'] } };
            }
            if ("index" in filters) {
                query = { ...query, "index_group_name": { $eq: filters['index'] } }
            }
            if ("section" in filters) {
                query = { ...query, "section_name": { $eq: filters['section'] } }
            }
            if ("garmentGroup" in filters) {
                query = { ...query, "garment_group_name": { $eq: filters['garmentGroup'] } }
            }
            if ("productType" in filters) {
                query = { ...query, "product_type_name": { $eq: filters['productType'] } }
            }
        }

        let cursor;
        try {
            cursor = await products.find(query)
                .limit(productsPerPage)
                .skip(productsPerPage * page);
            const productsList = await cursor.toArray();
            const totalNumProducts = await products.countDocuments(query);
            return { productsList, totalNumProducts };
        } catch (e) {
            console.error(`Unable to issue find command, ${e}`);
            return { productsList: [], totalNumProducts: 0 };
        }
    }

    static async getProductById(id) {
        try {
            return await products.find({ "product_code": { $eq: id } }).next();
        } catch (e) {
            console.error(`Something went wrong in getProductById: ${e}`);
            throw e;
        }
    }
}