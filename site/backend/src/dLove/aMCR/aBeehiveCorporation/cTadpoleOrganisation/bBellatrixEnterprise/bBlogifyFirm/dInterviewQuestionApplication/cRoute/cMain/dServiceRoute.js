const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { serviceController } = require('../../bController/cMain/dServiceController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), serviceController().list);
router.route("/create").post(authenticateUser(UserModel), serviceController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), serviceController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), serviceController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), serviceController().delete);

module.exports = router
