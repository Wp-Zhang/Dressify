import express from 'express';
import AccountController from './account.controller.js';

const router = express.Router(); // get access to the express router

router.route("/favorites").put(AccountController.apiUpdateFavorites);
router.route("/favorites/id/:userId").get(AccountController.apiGetFavorites);

export default router;