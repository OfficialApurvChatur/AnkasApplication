const express = require('express');
const authenticateUser = require('../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../aModel/bAdministration/aUserModel');
const { baseController } = require('../../bController/aSetting/aBaseController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), baseController().list);
router.route("/create").post(authenticateUser(UserModel), baseController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), baseController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), baseController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), baseController().delete);

module.exports = router
