const express = require('express');
const { homePageController } = require('../bController/HomePageController');

const router = express.Router();


router.route("/retrieve").get(homePageController().retrieve);
router.route("/admin-retrieve").get(homePageController().admin_retrieve);

module.exports = router
