import express from 'express';
import RecommendController from './recommend.controller.js';

const router = express.Router(); // get access to the express router

router.route("/:uid").get(RecommendController.apiGetRecommendations);

export default router;