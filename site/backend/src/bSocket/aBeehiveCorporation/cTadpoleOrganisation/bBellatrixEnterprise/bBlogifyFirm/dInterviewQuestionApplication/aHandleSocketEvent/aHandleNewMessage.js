const { v4: uuid } = require('uuid'); // Make sure to install uuid: npm install uuid
const MessageModel = require('../../../../../../../dLove/aMCR/bCommon/aModel/eChat/bMessageModel');
const accessSocketOfUser = require('../../../../../../../dLove/bFunction/nAccessSocketOfUser');

const handleNewMessage = (socket, io) => {
  const user = socket.user;

  socket.on("NEW_MESSAGE", async (data) => {
    // console.log("New Message", data.aSubtitle, data.cChat, data.cMembers)

    const messageForRealTime = {
      // _id: uuid(),
      aSubtitle: data.aSubtitle,
      cSender: {
        _id: user._id,
        aTitle: user.aTitle,
      },
      cChat: data.cChat,
      bCreatedAt: new Date().toISOString(),
      bCreatedBy: user._id,
    };

    const messageForDB = {
      aTitle: uuid(),
      aSubtitle: data.aSubtitle,
      cSender: user._id,
      cChat: data.cChat,
      bCreatedAt: new Date().toISOString(),
      bCreatedBy: user._id,
    };

    // const messageForDB = {
    //   content: message,
    //   sender: user._id,
    //   chat: chatId,
    // };

    const membersSocket = accessSocketOfUser(data.cMembers, populated=true);

    io.to(membersSocket).emit("NEW_MESSAGE", messageForRealTime);
    io.to(membersSocket).emit("NEW_MESSAGE_ALERT", { cChat: data.cChat });

    try {
      await MessageModel.create(messageForDB);
    } catch (error) {
      console.error("Error handling NEW_MESSAGE event:", error);
    }
  });
};

module.exports = handleNewMessage;
