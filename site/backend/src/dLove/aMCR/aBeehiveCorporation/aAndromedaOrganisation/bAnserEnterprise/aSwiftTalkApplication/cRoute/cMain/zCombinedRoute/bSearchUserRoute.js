const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../../aMCR/bCommon/aModel/bAdministration/aUserModel');
const { searchUserController } = require('../../../bController/cMain/zCommonController/aSearchUserController');

const router = express.Router();


router.route("/search-user").get(authenticateUser(UserModel), searchUserController().list);

module.exports = router
