import mongodb from "mongodb";

let productTypes;

export default class CategoryDAO {
    static async injectDB(conn) {
        if (productTypes) {
            return;
        }
        try {
            productTypes = await conn.db(process.env.DRESSIFY_NS).collection("category");
        } catch (e) {
            console.error(`unable to connect in CategoryDAO: ${e}`);
        }
    }

    static async getSections(index) {
        try {
            let query = {}
            if (index) {
                query = { "index_group_name": { $eq: index } }
            } else {
                console.log("request all sections")
            }
            let cursor = await productTypes.find(query);
            let sectionList = await cursor.toArray();
            sectionList = sectionList.map((category) => category.section_name);
            sectionList = [...new Set(sectionList)]
            return sectionList
        } catch (e) {
            console.error(`Something went wrong in getSections: ${e}`);
            throw e;
        }
    }

    static async getProductTypes(index = null, section) {
        let query = {}
        if (index) {
            query = { "index_group_name": { $eq: index } }
        }
        query = { ...query, "section_name": { $eq: section } }

        try {
            let cursor = await productTypes.find(query);
            let typeList = await cursor.toArray();
            return typeList.map((category) => category.garment_group_name);
        } catch (e) {
            console.error(`Something went wrong in getProductTypes: ${e}`);
            throw e;
        }
    }
}