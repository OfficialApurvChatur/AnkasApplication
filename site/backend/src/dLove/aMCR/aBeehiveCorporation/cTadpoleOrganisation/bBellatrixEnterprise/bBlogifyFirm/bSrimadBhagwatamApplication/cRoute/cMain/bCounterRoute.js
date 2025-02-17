const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { counterController } = require('../../bController/cMain/bCounterController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), counterController().list);
router.route("/create").post(authenticateUser(UserModel), counterController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), counterController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), counterController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), counterController().delete);

module.exports = router
