const express = require('express');
const authenticateUser = require('../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../aModel/bAdministration/aUserModel');
const { menuController } = require('../../bController/bAdministration/cMenuController');

const router = express.Router();


router.route("/list").get(menuController().list);
router.route("/create").post(authenticateUser(UserModel), menuController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), menuController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), menuController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), menuController().delete);


module.exports = router
