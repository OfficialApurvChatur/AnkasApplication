const express = require('express');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const UserModel = require('../../../../../../../bCommon/aModel/bAdministration/aUserModel');
const { projectController } = require('../../bController/cMain/jProjectController');
const multerUpload = require('../../../../../../../../cMiddleware/bMulter');

const router = express.Router();


router.route("/list").get(authenticateUser(UserModel), projectController().list);
router.route("/create").post(authenticateUser(UserModel), multerUpload.array("dGalleryImages", 10), projectController().create);
router.route("/retrieve/:id").get(authenticateUser(UserModel), projectController().retrieve);
router.route("/update/:id").put(authenticateUser(UserModel), multerUpload.array("dGalleryImages", 10), projectController().update);
router.route("/delete/:id").delete(authenticateUser(UserModel), projectController().delete);

module.exports = router
