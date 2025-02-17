const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../../aMCR/bCommon/aModel/bAdministration/aUserModel');
const { programController } = require('../../bController/cMain/dProgramController');
const multerUpload = require('../../../../../../../../cMiddleware/bMulter');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), programController().list);
router.route("/create").post(authenticateUser(UserModel), multerUpload.array("dGalleryImages", 10), programController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), programController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), multerUpload.array("dGalleryImages", 10), programController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), programController().delete);

module.exports = router
