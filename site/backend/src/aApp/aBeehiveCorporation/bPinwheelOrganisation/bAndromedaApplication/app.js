// Imports
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const expressSession = require('express-session');
const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;
const errorHandler = require('../../../../dLove/cMiddleware/aError');
const googleFunction = require('../../../../dLove/bFunction/lGoogleFunction');

const baseRoute = require('../../../../dLove/aMCR/bCommon/cRoute/aSetting/aBaseRoute');
const adminHeroRoute = require('../../../../dLove/aMCR/bCommon/cRoute/aSetting/bAdminHeroRoute');
const notificationRoute = require('../../../../dLove/aMCR/bCommon/cRoute/aSetting/cNotificationRoute');
const menuRoute = require('../../../../dLove/aMCR/bCommon/cRoute/bAdministration/cMenuRoute');
const roleRoute = require('../../../../dLove/aMCR/bCommon/cRoute/bAdministration/bRoleRoute');
const userRoute = require('../../../../dLove/aMCR/bCommon/cRoute/bAdministration/aUserRoute');
const heroRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommon/cRoute/cMain/aHeroRoute');
const counterRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommon/cRoute/cMain/bCounterRoute');
const aboutRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommon/cRoute/cMain/cAboutRoute');
const serviceRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommon/cRoute/cMain/dServiceRoute');
const branchRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommon/cRoute/cMain/eBranchRoute');
const subBranchRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommon/cRoute/cMain/fSubBranchRoute');
const subSubBranchRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommon/cRoute/cMain/gSubSubBranchRoute');
const projectSectionRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommon/cRoute/cMain/hProjectSectionRoute');
const projectGroupRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommon/cRoute/cMain/iProjectGroupRoute');
const projectRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommon/cRoute/cMain/jProjectRoute');
const staticDataRoute = require('../../../../dLove/aMCR/bCommon/cRoute/dAsset/aStaticDataRoute');

const homePageRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommonCombined/cRoute/HomePageRoute');
const projectPageRoute = require('../../../../dLove/aMCR/aBeehiveCorporation/bPinwheelOrganisation/zCommonCombined/cRoute/bProjectPageRoute');

const chatPageRoute = require('../../../../dLove/aMCR/bCommon/cRoute/eChat/zCombinedRoute/aChatPageRoute');

// App
const app = express()

const clientID = "873661181159-1jmdov39vh39md4hc6jhqf0bjmd5qt67.apps.googleusercontent.com"
const clientSecret = "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"

// Use
app.use(morgan("dev"))
app.use(express.json({
  limit: '50mb'
}))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({ origin:  
  process.env.ENVIRONMENT === "Production" ?
  [
    "https://andromeda-admin.netlify.app",
    "https://andromeda-frontend.netlify.app",
  ] : 
  [
    "http://localhost:5173",
    "http://localhost:5174",
  ], 
  credentials: true 
}))

// // Session
// app.use(expressSession({
//   secret: "awdasJJsadjsaskakwijolkpoopiewnmasdiiwIJaoopadsdopo",
//   resave: false,
//   saveUninitialized: true
// }))

// // Passport
// app.use(passport.initialize());
// app.use(passport.session());

// passport.use(
//   new OAuth2Strategy({
//     clientID,
//     clientSecret,
//     callbackURL: "/auth/google/callback",
//     scope: ["profile", "email"]
//   }, 
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await UserModel.findOne({ eGoogleID: profile.id })
  
//       if (!user) {
//         user = new UserModel({
//           eGoogleID: profile.id,
//           eEmail: profile.emails[0].value,
//           eFirstName: profile.given_name,
//           eLastName: profile.family_name,
//           ePassword: profile.family_name,
//           aTitle: profile.family_name,
//           aSubtitle: profile.family_name,
//           eImage: {
//             url: profile.photos[0].value
//           },
//         })
//         await user.save();
//       }
//       return done(null, user)
  
//     } catch (error) { 
//       return done(error, null)
//     }
//   }
//   ),
// )

// passport.serializeUser((user, done) => {
//   done(null, user)
// })

// passport.deserializeUser((user, done) => {
//   done(null, user)
// })

// // Google Auth Initial
// app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }))
// app.get("/auth/google/callback", passport.authenticate("google", { 
//   successRedirect: "http://localhost:5173",
//   failureRedirect: "http://localhost:5173/login"
// }))

app.use("/api/v1/base", baseRoute)
app.use("/api/v1/admin-hero", adminHeroRoute)
app.use("/api/v1/notification", notificationRoute)
app.use("/api/v1/menu", menuRoute)
app.use("/api/v1/role", roleRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/hero", heroRoute)
app.use("/api/v1/counter", counterRoute)
app.use("/api/v1/about", aboutRoute)
app.use("/api/v1/service", serviceRoute)
app.use("/api/v1/branch", branchRoute)
app.use("/api/v1/sub-branch", subBranchRoute)
app.use("/api/v1/sub-sub-branch", subSubBranchRoute)
app.use("/api/v1/project-section", projectSectionRoute)
app.use("/api/v1/project-group", projectGroupRoute)
app.use("/api/v1/project", projectRoute)
app.use("/api/v1/static-data", staticDataRoute)

app.use("/api/v1/home-page", homePageRoute)
app.use("/api/v1/project-page", projectPageRoute)
app.use("/api/v1/chat-page", chatPageRoute)

app.use(errorHandler)


module.exports = app
