const express = require('express');
const { projectPageController } = require('../../../bController/cMain/aCommonController/bProjectPageController');

const router = express.Router();


router.route("/retrieve/:id").get(projectPageController().retrieve);

module.exports = router
