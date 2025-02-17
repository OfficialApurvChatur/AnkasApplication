const express = require('express');
const authenticateUser = require('../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../aModel/bAdministration/aUserModel');
const { adminHeroController } = require('../../bController/aSetting/bAdminHeroController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), adminHeroController().list);
router.route("/create").post(authenticateUser(UserModel), adminHeroController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), adminHeroController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), adminHeroController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), adminHeroController().delete);

module.exports = router
