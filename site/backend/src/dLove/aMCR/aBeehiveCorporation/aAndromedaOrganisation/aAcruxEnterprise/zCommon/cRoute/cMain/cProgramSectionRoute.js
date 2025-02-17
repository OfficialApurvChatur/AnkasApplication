const express = require('express');
const authenticateUser = require('../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../aMCR/bCommon/aModel/bAdministration/aUserModel');
const { programSectionController } = require('../../bController/cMain/cProgramSectionController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), programSectionController().list);
router.route("/create").post(authenticateUser(UserModel), programSectionController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), programSectionController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), programSectionController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), programSectionController().delete);

module.exports = router
