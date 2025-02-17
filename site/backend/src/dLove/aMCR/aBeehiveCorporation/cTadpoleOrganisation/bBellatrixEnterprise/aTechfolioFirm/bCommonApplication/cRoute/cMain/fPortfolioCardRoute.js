const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { portfolioCardController } = require('../../bController/cMain/fPortfolioCardController');
const multerUpload = require('../../../../../../../../cMiddleware/bMulter');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), portfolioCardController().list);
router.route("/create").post(authenticateUser(UserModel), multerUpload.array("dPortfolioImages", 10), portfolioCardController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), portfolioCardController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), multerUpload.array("dPortfolioImages", 10), portfolioCardController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), portfolioCardController().delete);

module.exports = router
