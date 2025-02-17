const express = require('express');
const { portfolioCardPageController } = require('../../../bController/cMain/zCombinedController/bPortfolioCardPageController');

const router = express.Router();


router.route("/list").get(portfolioCardPageController().list);
router.route("/retrieve/:id").get(portfolioCardPageController().retrieve);

module.exports = router
