const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { subSubBranchController } = require('../../bController/cMain/gSubSubBranchController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), subSubBranchController().list);
router.route("/create").post(authenticateUser(UserModel), subSubBranchController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), subSubBranchController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), subSubBranchController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), subSubBranchController().delete);

module.exports = router
