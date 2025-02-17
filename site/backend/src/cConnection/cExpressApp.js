
const expressApp = () => {
  const corporation = process.env.CORPORATION;
  const organisation = process.env.ORGANISATION;
  const enterprise = process.env.ENTERPRISE;
  const firm = process.env.FIRM;
  const application = process.env.APPLICATION;

  let app;

  const appConfig = {
    BeehiveCorporation: {
      AndromedaOrganisation: {
        AcruxEnterprise: {
          ArionApplication: "../aApp/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/aArionApplication/app",
          AnkasApplication: "../aApp/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/bAnkasApplication/app",
          AbolApplication: "../aApp/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/cAbolApplication/app"
        },
        AnserEnterprise: {
          SwiftTalkApplication: "../aApp/aBeehiveCorporation/aAndromedaOrganisation/bAnserEnterprise/aSwiftTalkApplication/app"
        }
      },
      PinwheelOrganisation: {
        BeehiveApplication: "../aApp/aBeehiveCorporation/bPinwheelOrganisation/aBeehiveApplication/app",
        AndromedaApplication: "../aApp/aBeehiveCorporation/bPinwheelOrganisation/bAndromedaApplication/app",
        PinwheelApplication: "../aApp/aBeehiveCorporation/bPinwheelOrganisation/cPinwheelApplication/app",
        TadpoleApplication: "../aApp/aBeehiveCorporation/bPinwheelOrganisation/dTadpoleApplication/app",
        AcruxApplication: "../aApp/aBeehiveCorporation/bPinwheelOrganisation/eAcruxEnterprise/app",
        AnserApplication: "../aApp/aBeehiveCorporation/bPinwheelOrganisation/fAnserApplication/app",
        AquilaApplication: "../aApp/aBeehiveCorporation/bPinwheelOrganisation/gAquilaApplication/app",
        BellatrixApplication: "../aApp/aBeehiveCorporation/bPinwheelOrganisation/hBellatrixApplication/app",
        CapellaApplication: "../aApp/aBeehiveCorporation/bPinwheelOrganisation/iCapellaApplication/app"
      },
      TadpoleOrganisation: {
        BellatrixEnterprise: {
          TechfolioFirm: {
            TechfolioApplication: "../aApp/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/aTechfolioAppliation/app",
            ApurvChaturApplication: "../aApp/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bApurvChaturApplication/app",
            AnushreeMandapeApplication: "../aApp/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/cAnushreeMandapeApplication/app",
            SofieBerkinApplication: "../aApp/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/dSofieBerkinApplication/app"
          },
          BlogifyFirm: {
            BlogifyApplication: "../aApp/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/bBlogifyFirm/aBlogifyApplication/app",
            SrimadBhagwatamApplication: "../aApp/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/bBlogifyFirm/bSrimadBhagwatamApplication/app",
            BhagwadGitaApplication: "../aApp/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/bBlogifyFirm/cBhagwadGitaApplication/app",
            InterviewQuestionApplication: "../aApp/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/bBlogifyFirm/dInterviewQuestionApplication/app"
          }
        }
      }
    }
  };

  if (appConfig[corporation] && appConfig[corporation][organisation] && appConfig[corporation][organisation][enterprise] && appConfig[corporation][organisation][enterprise][firm]) {
    if (application && appConfig[corporation][organisation][enterprise][firm][application]) {
      console.log("Succeed to connect to app.js")
      app = require(appConfig[corporation][organisation][enterprise][firm][application]);
      return app;
    } else {
      console.log("Failed to connect to app.js")
    }
  } else if (appConfig[corporation] && appConfig[corporation][organisation] && appConfig[corporation][organisation][enterprise]) {
    if (application && appConfig[corporation][organisation][enterprise][application]) {
      console.log("Succeed to connect to app.js")
      app = require(appConfig[corporation][organisation][enterprise][application]);
      return app;
    } else {
      console.log("Failed to connect to app.js")
    }  
  } else if (appConfig[corporation] && appConfig[corporation][organisation]) {
    if (application && appConfig[corporation][organisation][application]) {
      console.log("Succeed to connect to app.js")
      app = require(appConfig[corporation][organisation][application]);
      return app;
    } else {
      console.log("Failed to connect to app.js")
    }  
  } else {
    console.log("Failed to connect to app.js")
  }

}

module.exports = expressApp