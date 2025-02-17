const cloudinary = require("cloudinary")


const getBase64 = (file) => 
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

const handleMultipleImage = async (files = [], folder, fieldname) => {

  const uploadPromises = files.map(file => {
    if (file.fieldname === fieldname) {
      return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(
          getBase64(file), 
          { folder: folder },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
      });
    }
  });

  try {
    const results = await Promise.all(uploadPromises);

    const formattedResults = results.map((result) => ({
      public_id: result.public_id,
      url: result.secure_url,
    }));

    return formattedResults;
  } catch (err) {
    throw new Error("Error uploading files to cloudinary", err);
  }
};

module.exports = handleMultipleImage;
