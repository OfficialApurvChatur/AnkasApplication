const express = require('express');
const authenticateUser = require('../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../aModel/bAdministration/aUserModel');
const { notificationController } = require('../../bController/aSetting/cNotificationController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), notificationController().list);
router.route("/create").post(authenticateUser(UserModel), notificationController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), notificationController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), notificationController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), notificationController().delete);

module.exports = router
