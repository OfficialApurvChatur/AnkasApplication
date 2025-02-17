const express = require('express');
const authenticateUser = require('../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../aModel/bAdministration/aUserModel');
const { userController } = require('../../bController/bAdministration/aUserController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), userController().list);
router.route("/create").post(authenticateUser(UserModel), userController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), userController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), userController().update);
router.route("/update-password/:id").put(authenticateUser(UserModel), userController().updatePassword);
router.route("/delete/:id").delete(authenticateUser(UserModel), userController().delete);

router.route("/register").post(userController().register);
router.route("/login").post(userController().login);
router.route("/logout").get(authenticateUser(UserModel), userController().logout);
router.route("/forgot-password").post(userController().forgotPassword);
router.route("/reset-password/:token").put(userController().resetPassword);

router.route("/profile-retrieve").get(authenticateUser(UserModel), userController().profileRetrieve);
router.route("/profile-update").post(authenticateUser(UserModel), userController().profileUpdate);
router.route("/profile-update-password").post(authenticateUser(UserModel), userController().profileUpdatePassword);
router.route("/profile-delete").post(authenticateUser(UserModel), userController().profileDelete);


module.exports = router
