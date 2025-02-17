const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { heroController } = require('../../bController/cMain/aHeroController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), heroController().list);
router.route("/create").post(authenticateUser(UserModel), heroController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), heroController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), heroController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), heroController().delete);

module.exports = router
