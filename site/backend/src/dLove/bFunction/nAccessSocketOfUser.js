const assignUserToSocket = require("./sAssignUserToSocket");

const accessSocketOfUser = (users = [], populated) => {
  if (populated) return users.map((user) => assignUserToSocket.get(user._id.toString()))
  return users.map((user) => assignUserToSocket.get(user.toString()))
};

module.exports = accessSocketOfUser;