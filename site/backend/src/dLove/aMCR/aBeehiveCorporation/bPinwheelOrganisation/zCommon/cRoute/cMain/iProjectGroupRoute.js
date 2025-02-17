const express = require('express');
const authenticateUser = require('../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../bCommon/aModel/bAdministration/aUserModel');
const { projectGroupController } = require('../../bController/cMain/iProjectGroupController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), projectGroupController().list);
router.route("/create").post(authenticateUser(UserModel), projectGroupController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), projectGroupController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), projectGroupController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), projectGroupController().delete);

module.exports = router
