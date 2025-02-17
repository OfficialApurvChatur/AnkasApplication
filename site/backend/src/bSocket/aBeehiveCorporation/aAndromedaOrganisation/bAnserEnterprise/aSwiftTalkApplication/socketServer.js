const { Server } = require("socket.io");
const cookieParser = require('cookie-parser');
const socketAuthenticatedUser = require("../../../../../dLove/bFunction/oSocketAuthenticatedUser");
const NotificationModel = require("../../../../../dLove/aMCR/bCommon/aModel/aSetting/cNotificationModel");


const eventConstants = [
  { code: "BASE", text: "Base" }, 
  { code: "ADMIN_HERO", text: "Admin Hero" }, 
  // { code: "NOTIFICATION", text: "Notification" }, 

  { code: "USER", text: "User" },
  { code: "ROLE", text: "Role" }, 
  { code: "MENU", text: "Menu" },

  { code: "HERO", text: "Hero" },
  { code: "COUNTER", text: "Counter" },

  { code: "STATIC_DATA", text: "Static Data" },
]

const typeConstants = ["CREATED", "UPDATED", "DELETED"]

const socketServer = (server) => {
  // Socket 
  const io = new Server(server, {
    cors: { origin:  
      process.env.ENVIRONMENT === "Production" ?
        [
          "https://swift-talk-admin.netlify.app",
          "https://swift-talk-frontend.netlify.app",
        ] : 
        [
          "http://localhost:5173",
          "http://localhost:5174",
        ], 
      credentials: true 
    }
  })

  // Socket Middleware
  io.use((socket, next) => {
    cookieParser()(
      socket.request, 
      socket.request.res, 
      error => socketAuthenticatedUser(error, socket, next)
    );
  });

  // Listening Event
  io.on("connection", (socket) => {
    const user = socket.user
    console.log("User Connected", socket.id);

    eventConstants.map(each => {
      typeConstants.map(each1 => {
        socket.on(`${each.code}_${each1}`, async data => {
          const notification = await NotificationModel.create({
            aTitle: `Noti ${(Math.random() * 6) + 1} ${data.aTitle}'`,
            aSubtitle: `${each.text} '${data.aTitle}' ${each1.charAt(0).toUpperCase() + each1.slice(1).toLowerCase()}`,  
            aDescription: `Tap to view`  
          });
          io.emit("NOTIFICATION_CREATED", notification)
          io.emit(`${each.code}_LISTED`, data)
        })  
      })
    })

    socket.on("disconnect", () => {
      console.log("User Disconnected")
    })
  })  
}

module.exports = socketServer