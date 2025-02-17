const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { eventController } = require('../../bController/cMain/gEventController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), eventController().list);
router.route("/create").post(authenticateUser(UserModel), eventController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), eventController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), eventController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), eventController().delete);

module.exports = router
