const accessSocketOfUser = require("./nAccessSocketOfUser");

const emitEvent = async (request, event, users, data) => {
  console.log("Emmiting event...", event, users)

  const io = request.app.get("io");
  const usersSocket = accessSocketOfUser(users, populated=false);

  io.to(usersSocket).emit(event, data);

};

module.exports = emitEvent;