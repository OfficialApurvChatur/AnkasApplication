const express = require('express');
const authenticateUser = require('../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../aModel/bAdministration/aUserModel');
const { staticDataController } = require('../../bController/dAsset/aStaticDataController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), staticDataController().list);
router.route("/create").post(authenticateUser(UserModel), staticDataController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), staticDataController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), staticDataController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), staticDataController().delete);

module.exports = router
