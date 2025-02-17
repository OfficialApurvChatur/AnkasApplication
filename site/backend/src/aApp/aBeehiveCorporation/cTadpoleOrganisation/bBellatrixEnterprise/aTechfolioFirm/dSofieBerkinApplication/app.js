// Imports
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const errorHandler = require('../../../../../../dLove/cMiddleware/aError');

const baseRoute = require('../../../../../../dLove/aMCR/bCommon/cRoute/aSetting/aBaseRoute');
const adminHeroRoute = require('../../../../../../dLove/aMCR/bCommon/cRoute/aSetting/bAdminHeroRoute');
const notificationRoute = require('../../../../../../dLove/aMCR/bCommon/cRoute/aSetting/cNotificationRoute');
const menuRoute = require('../../../../../../dLove/aMCR/bCommon/cRoute/bAdministration/cMenuRoute');
const roleRoute = require('../../../../../../dLove/aMCR/bCommon/cRoute/bAdministration/bRoleRoute');
const userRoute = require('../../../../../../dLove/aMCR/bCommon/cRoute/bAdministration/aUserRoute');
const heroRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/aHeroRoute');
const aboutRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/bAboutRoute');
const experienceRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/cExperienceRoute');
const serviceRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/dServiceRoute');
const portfolioRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/ePortfolioRoute');
const portfolioCardRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/fPortfolioCardRoute');
const eventRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/gEventRoute');
const eventCardRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/hEventCardRoute');
const blogRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/iBlogRoute');
const blogCardRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/jBlogCardRoute');
const staticDataRoute = require('../../../../../../dLove/aMCR/bCommon/cRoute/dAsset/aStaticDataRoute');

const homePageRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/zCombinedRoute/aHomePageRoute');
const portfolioCardPageRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/zCombinedRoute/bPortfolioCardPageRoute');
const eventCardPageRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/zCombinedRoute/cEventCardPageRoute');
const blogCardPageRoute = require('../../../../../../dLove/aMCR/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bCommonApplication/cRoute/cMain/zCombinedRoute/dBlogCardPageRoute');


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
    "https://sofie-berkin-admin.netlify.app",
    "https://sofie-berkin-frontend.netlify.app",
    "https://sofiebirkinn.netlify.app",
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
app.use("/api/v1/about", aboutRoute)
app.use("/api/v1/experience", experienceRoute)
app.use("/api/v1/service", serviceRoute)
app.use("/api/v1/portfolio", portfolioRoute)
app.use("/api/v1/portfolio-card", portfolioCardRoute)
app.use("/api/v1/event", eventRoute)
app.use("/api/v1/event-card", eventCardRoute)
app.use("/api/v1/blog", blogRoute)
app.use("/api/v1/blog-card", blogCardRoute)
app.use("/api/v1/static-data", staticDataRoute)

app.use("/api/v1/home-page", homePageRoute)
app.use("/api/v1/portfolio-card-page", portfolioCardPageRoute)
app.use("/api/v1/event-card-page", eventCardPageRoute)
app.use("/api/v1/blog-card-page", blogCardPageRoute)

app.use(errorHandler)


module.exports = app
