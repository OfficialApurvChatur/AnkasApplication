const { body, param, validationResult } = require("express-validator");
const ErrorHandler = require("../bFunction/bErrorHandler");
const ChatModel = require("../aMCR/bCommon/aModel/eChat/aChatModel");


const validationHandler = (req, res, next) => {
  const errors = validationResult(req);

  const errorMessages = errors.array().map((error) => error.msg).join(", ");

  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};

const createGroupChatValidation = () => [
  body("aTitle")
    .notEmpty().withMessage("Please enter title"),
  body("aSubtitle")
    .notEmpty().withMessage("Please enter subtitle"),
  body("cMembers")
    .notEmpty().withMessage("Please select members")
    .customSanitizer((input, { req: request }) => {
      // Remove duplicates
      output = input?.reduce((accumulator, value) => {
        if (!accumulator.includes(value)) {
          accumulator.push(value);
        }
        return accumulator;
      }, []);
    
      // Filter out the current user
      output = input?.filter(each => each.toString() !== request.user.toString());

      return output;  
    })
    .isArray({ min: 2, max: 10 }).withMessage("Group chat must have atleast 2 members other than you"),
];

const addMemberValidation = () => [
  body("chatID")
    .notEmpty().withMessage("Please provide Chat ID")
    .custom(async (value, { req: request }) => {
      const object = await ChatModel.findById(value);

      if (!object) throw "Chat not found";
			if (!object.dIsGroupChat) throw "Not Group Chat";
			if (!object.cMembers.includes(request.user.toString())) throw "You are not the member of this group";
			if (object.cAdmin.toString() !== request.user.toString()) throw "Not Allowed To Add Members";

      return true;
    }),
  body("members")
    .notEmpty().withMessage("Please select members")
    .isArray({ min: 1, max: 10 }).withMessage("Select atleast 1 member"),
];


module.exports = { validationHandler, createGroupChatValidation, addMemberValidation };
