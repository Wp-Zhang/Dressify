import express from 'express';
import AccountController from './account.controller.js';

const router = express.Router(); // get access to the express router

router.route("/favorites").put(AccountController.apiUpdateFavorites);
router.route("/favorites/id/:userId").get(AccountController.apiGetFavorites);
router.route("/cart").put(AccountController.apiUpdateCart);
router.route("/cart/id/:userId").get(AccountController.apiGetCart);
router.route("/order").put(AccountController.apiAddOrder);
router.route("/order/id/:orderId").delete(AccountController.apiDeleteOrder);
router.route("/order/id/:userId").get(AccountController.apiGetOrders);

export default router;