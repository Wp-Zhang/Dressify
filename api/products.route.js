import express from 'express';
import ProductController from './products.controller.js';
// import FavoriteController from './favorites.controller.js';
// import OrderController from './orders.controller.js';
// import cartController from './cart.controller.js';

const router = express.Router(); // get access to the express router

router.route("/").get(ProductController.apiGetProducts);
router.route("/id/:id").get(ProductController.apiGetProductById);
router.route("/article/id/:id").get(ProductController.apiGetArticleById);

// router.route("/favorites").put(FavoriteController.apiUpdateFavorites);
// router.route("/favorites/id/:userId").get(FavoriteController.apiGetFavorites);

export default router;