const cloudinary = require("cloudinary")


const destroyImage = async (id) => {
  await cloudinary.v2.uploader.destroy(id);
}

module.exports = destroyImage;
