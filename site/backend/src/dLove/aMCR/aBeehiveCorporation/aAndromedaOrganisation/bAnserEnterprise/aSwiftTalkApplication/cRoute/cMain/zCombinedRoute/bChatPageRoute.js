const express = require('express');
const UserModel = require('../../../../../../../../aMCR/bCommon/aModel/bAdministration/aUserModel');
const authenticateUser = require('../../../../../../../../bFunction/dAuthenticateUser');
const { chatPageController } = require('../../../bController/cMain/zCombinedController/bChatPageController');
const { attachmentMulter } = require('../../../../../../../../cMiddleware/bMulter');

const router = express.Router();

router.route("/create-group-chat").post(authenticateUser(UserModel), chatPageController().createGroupChat);
router.route("/user-chat-list").get(authenticateUser(UserModel), chatPageController().userChatList);
router.route("/user-group-chat-list").get(authenticateUser(UserModel), chatPageController().userGroupChatList);
router.route("/user-group-chat-add-members").put(authenticateUser(UserModel), chatPageController().addMember);
router.route("/user-group-chat-remove-member").put(authenticateUser(UserModel), chatPageController().removeMember);
router.route("/user-group-chat-leave/:id").delete(authenticateUser(UserModel), chatPageController().leaveGroup);

router.route("/message").post(authenticateUser(UserModel), attachmentMulter, chatPageController().sendAttachment);
router.route("/retrieve/:id").get(authenticateUser(UserModel), chatPageController().retrieveChat);
router.route("/rename/:id").put(authenticateUser(UserModel), chatPageController().renameChat);
router.route("/retrieve-messages/:id").get(authenticateUser(UserModel), chatPageController().getMessages);
router.route("/search-users/").get(authenticateUser(UserModel), chatPageController().searchUser);

module.exports = router
