const ErrorHandler = require("./bErrorHandler");

const idToObject = async (object, model, label, next) => {
    const object_retrieve = await new Promise(async resolve => {
        resolve(await model.findById(object.id))
    });

    // Not Found
    if (!object_retrieve) next(new ErrorHandler(`${label} Not Found`, 404))

    return object_retrieve
}

module.exports = idToObject;
