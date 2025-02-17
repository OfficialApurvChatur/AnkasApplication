const express = require('express');
const { programPageController } = require('../bController/bProgramPageController');

const router = express.Router();


router.route("/retrieve/:id").get(programPageController().retrieve);

module.exports = router
