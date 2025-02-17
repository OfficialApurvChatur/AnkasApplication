const express = require('express');
const authenticateUser = require('../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../bCommon/aModel/bAdministration/aUserModel');
const { subBranchController } = require('../../bController/cMain/fSubBranchController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), subBranchController().list);
router.route("/create").post(authenticateUser(UserModel), subBranchController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), subBranchController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), subBranchController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), subBranchController().delete);

module.exports = router
