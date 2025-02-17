// Imports
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('../../../../../dLove/cMiddleware/aError');

const baseRoute = require('../../../../../dLove/aMCR/bCommon/cRoute/aSetting/aBaseRoute');
const adminHeroRoute = require('../../../../../dLove/aMCR/bCommon/cRoute/aSetting/bAdminHeroRoute');
const notificationRoute = require('../../../../../dLove/aMCR/bCommon/cRoute/aSetting/cNotificationRoute');
const menuRoute = require('../../../../../dLove/aMCR/bCommon/cRoute/bAdministration/cMenuRoute');
const roleRoute = require('../../../../../dLove/aMCR/bCommon/cRoute/bAdministration/bRoleRoute');
const userRoute = require('../../../../../dLove/aMCR/bCommon/cRoute/bAdministration/aUserRoute');
const heroRoute = require('../../../../../dLove/aMCR/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/zCommon/cRoute/cMain/aHeroRoute');
const counterRoute = require('../../../../../dLove/aMCR/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/zCommon/cRoute/cMain/bCounterRoute');
const programSectionRoute = require('../../../../../dLove/aMCR/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/zCommon/cRoute/cMain/cProgramSectionRoute');
const programRoute = require('../../../../../dLove/aMCR/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/zCommon/cRoute/cMain/dProgramRoute');
const staticDataRoute = require('../../../../../dLove/aMCR/bCommon/cRoute/dAsset/aStaticDataRoute');

const homePageRoute = require('../../../../../dLove/aMCR/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/zCommonCombined/cRoute/HomePageRoute');
const programPageRoute = require('../../../../../dLove/aMCR/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/zCommonCombined/cRoute/bProgramPageRoute');

const chatPageRoute = require('../../../../../dLove/aMCR/bCommon/cRoute/eChat/zCombinedRoute/aChatPageRoute');

// App
const app = express()

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
    "https://abol-admin.netlify.app",
    "https://abol-frontend.netlify.app",
  ] : 
  [
    "http://localhost:5173",
    "http://localhost:5174",
  ], 
credentials: true }))

app.use("/api/v1/base", baseRoute)
app.use("/api/v1/admin-hero", adminHeroRoute)
app.use("/api/v1/notification", notificationRoute)
app.use("/api/v1/menu", menuRoute)
app.use("/api/v1/role", roleRoute)
app.use("/api/v1/user", userRoute)
app.use("/api/v1/hero", heroRoute)
app.use("/api/v1/counter", counterRoute)
app.use("/api/v1/program-section", programSectionRoute)
app.use("/api/v1/program", programRoute)
app.use("/api/v1/static-data", staticDataRoute)

app.use("/api/v1/home-page", homePageRoute)
app.use("/api/v1/program-page", programPageRoute)
app.use("/api/v1/chat-page", chatPageRoute)

app.use(errorHandler)


module.exports = app
