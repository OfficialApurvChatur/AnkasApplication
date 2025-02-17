const express = require('express');
const { blogCardPageController } = require('../../../bController/cMain/zCombinedController/dBlogCardPageController');

const router = express.Router();


router.route("/list").get(blogCardPageController().list);
router.route("/retrieve/:id").get(blogCardPageController().retrieve);

module.exports = router
