const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { portfolioController } = require('../../bController/cMain/ePortfolioController');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), portfolioController().list);
router.route("/create").post(authenticateUser(UserModel), portfolioController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), portfolioController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), portfolioController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), portfolioController().delete);

module.exports = router
