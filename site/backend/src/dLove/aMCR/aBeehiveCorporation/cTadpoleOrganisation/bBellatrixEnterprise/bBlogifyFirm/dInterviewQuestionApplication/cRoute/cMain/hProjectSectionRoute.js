const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { projectSectionController } = require('../../bController/cMain/hProjectSectionController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), projectSectionController().list);
router.route("/create").post(authenticateUser(UserModel), projectSectionController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), projectSectionController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), projectSectionController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), projectSectionController().delete);

module.exports = router
