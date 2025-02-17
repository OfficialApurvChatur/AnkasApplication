const express = require('express');
const UserModel = require('../../../../../aMCR/bCommon/aModel/bAdministration/aUserModel');
const authenticateUser = require('../../../../../bFunction/dAuthenticateUser');
const { chatPageController } = require('../../../bController/eChat/zCombinedController/aChatPageController');
const { validationHandler, createGroupChatValidation, addMemberValidation,  } = require('../../../../../cMiddleware/cValidator');

const router = express.Router();


router.route("/create-group-chat").post(authenticateUser(UserModel), createGroupChatValidation(), validationHandler, chatPageController().createGroupChat);
router.route("/user-chat-list").get(authenticateUser(UserModel), chatPageController().userChatList);
router.route("/user-group-chat-list").get(authenticateUser(UserModel), chatPageController().userGroupChatList);
router.route("/user-group-chat-add-members").put(authenticateUser(UserModel), addMemberValidation(), validationHandler, chatPageController().addMember);
router.route("/user-group-chat-remove-member").put(authenticateUser(UserModel), chatPageController().removeMember);
router.route("/user-group-chat-leave/:id").delete(authenticateUser(UserModel), chatPageController().leaveGroup);

// router.route("/message").post(authenticateUser(UserModel), attachmentMulter, chatPageController().sendAttachment);
router.route("/retrieve/:id").get(authenticateUser(UserModel), chatPageController().retrieveChat);
router.route("/rename/:id").put(authenticateUser(UserModel), chatPageController().renameChat);
router.route("/delete/:id").delete(authenticateUser(UserModel), chatPageController().deleteChat);
router.route("/retrieve-messages/:id").get(authenticateUser(UserModel), chatPageController().getMessages);
router.route("/search-users").get(authenticateUser(UserModel), chatPageController().searchUser);

router.route("/send-request").put(authenticateUser(UserModel), chatPageController().sendFriendRequest);
router.route("/get-friend-request").get(authenticateUser(UserModel), chatPageController().getFriendRequest);
router.route("/accept-request").put(authenticateUser(UserModel), chatPageController().acceptFriendRequest);
router.route("/get-friends").get(authenticateUser(UserModel), chatPageController().getMyFriends);

module.exports = router
