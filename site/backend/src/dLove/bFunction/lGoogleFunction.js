const UserModel = require("../aMCR/bCommon/aModel/bAdministration/aUserModel");


const googleFunction = async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await UserModel.findOne({ eGoogleID: profile.id })

    if (!user) {
      console.log("first")
      user = new UserModel({
        eGoogleID: profile.id,
        eEmail: profile.emails[0].value,
        eImage: {
          url: profile.photos[0].value
        }
      })
      await user.save();
    }
    return done(null, user)

  } catch (error) {
    console.log("first12")

    return done(error, null)
  }
};

module.exports = googleFunction;