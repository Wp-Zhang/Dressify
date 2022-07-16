import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let articles;

export default class ArticlesDAO {
    static async injectDB(conn) {
        if (articles) {
            return;
        }
        try {
            articles = await conn.db(process.env.DRESSIFY_NS).collection("articles");
        } catch (e) {
            console.error(`unable to connect in ArticlesDAO: ${e}`);
        }
    }

    static async getArticleById(id) {
        try {
            return await articles.find({ "article_id": { $eq: id } }).next();
        } catch (e) {
            console.error(`Something went wrong in getArticleById: ${e}`);
            throw e;
        }
    }
}