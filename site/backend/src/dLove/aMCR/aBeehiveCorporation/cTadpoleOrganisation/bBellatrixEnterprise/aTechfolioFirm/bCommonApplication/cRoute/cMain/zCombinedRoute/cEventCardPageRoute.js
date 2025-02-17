const express = require('express');
const { eventCardPageController } = require('../../../bController/cMain/zCombinedController/cEventCardPageController');

const router = express.Router();


router.route("/list").get(eventCardPageController().list);
router.route("/retrieve/:id").get(eventCardPageController().retrieve);

module.exports = router
