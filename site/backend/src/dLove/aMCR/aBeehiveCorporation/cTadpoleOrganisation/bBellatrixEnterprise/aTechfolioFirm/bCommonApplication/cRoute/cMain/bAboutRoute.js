const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { aboutController } = require('../../bController/cMain/bAboutController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), aboutController().list);
router.route("/create").post(authenticateUser(UserModel), aboutController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), aboutController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), aboutController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), aboutController().delete);

module.exports = router
