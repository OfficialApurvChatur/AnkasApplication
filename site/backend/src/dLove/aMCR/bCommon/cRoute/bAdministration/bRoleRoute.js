const express = require('express');
const authenticateUser = require('../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../aModel/bAdministration/aUserModel');
const { roleController } = require('../../bController/bAdministration/bRoleController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), roleController().list);
router.route("/create").post(authenticateUser(UserModel), roleController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), roleController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), roleController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), roleController().delete);


module.exports = router
