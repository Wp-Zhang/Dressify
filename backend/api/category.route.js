import express from 'express';
import CategoryController from './category.controller.js';

const router = express.Router(); // get access to the express router

router.route("/section").get(CategoryController.apiGetSections);
router.route("/type").get(CategoryController.apiGetProductTypes);

export default router;