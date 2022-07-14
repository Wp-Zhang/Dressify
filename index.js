import app from './server.js';
import mongodb from "mongodb";
import dotenv from "dotenv";
import ProductDAO from './dao/productsDAO.js';
import ArticlesDAO from './dao/articlesDAO.js';
import CategoryDAO from './dao/categoryDAO.js';
import FavoritesDAO from './dao/favoritesDAO.js';
import CartDAO from './dao/cartDAO.js';
// import OrderDAO from './dao/ordersDAO.js';

async function main() {
    dotenv.config();

    const client = new mongodb.MongoClient(process.env.DRESSIFY_DB_URI)
    const port = process.env.PORT || 8000;

    try {
        // Connect to MongoDB server
        await client.connect();
        await ProductDAO.injectDB(client);
        await ArticlesDAO.injectDB(client);
        await CategoryDAO.injectDB(client);
        await FavoritesDAO.injectDB(client);
        await CartDAO.injectDB(client);
        // await OrderDAO.injectDB(client);

        app.listen(port, () => {
            console.log('Server listening on port: ' + port);
        })
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

main().catch(console.error);