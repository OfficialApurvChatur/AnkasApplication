const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { blogCardController } = require('../../bController/cMain/jBlogCardController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), blogCardController().list);
router.route("/create").post(authenticateUser(UserModel), blogCardController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), blogCardController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), blogCardController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), blogCardController().delete);

module.exports = router
