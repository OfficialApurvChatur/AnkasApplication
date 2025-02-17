const ErrorHandler = require("./bErrorHandler");

const idsToObjects = async (list, model, label, next) => {
    const objects = [];
    console.log("first")
    for (const each of list) {
        const object_retrieve = await new Promise(async resolve => {
            resolve(await model.findById(each._id))
        });

        // Not Found
        if (!object_retrieve) next(new ErrorHandler(`${label} Not Found`, 404))

        objects.push(object_retrieve);
    }
    console.log("first")

    return objects
}

module.exports = idsToObjects;
