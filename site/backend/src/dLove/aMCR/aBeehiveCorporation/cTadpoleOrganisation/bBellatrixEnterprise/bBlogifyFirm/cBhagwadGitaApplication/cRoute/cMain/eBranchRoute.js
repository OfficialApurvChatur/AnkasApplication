const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { branchController } = require('../../bController/cMain/eBranchController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), branchController().list);
router.route("/create").post(authenticateUser(UserModel), branchController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), branchController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), branchController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), branchController().delete);

module.exports = router
