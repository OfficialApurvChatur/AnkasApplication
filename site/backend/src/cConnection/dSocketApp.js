
const socketApp = async (server, app) => {
  const corporation = process.env.CORPORATION;
  const organisation = process.env.ORGANISATION;
  const enterprise = process.env.ENTERPRISE;
  const firm = process.env.FIRM;
  const application = process.env.APPLICATION;

  let socketServer;

  const socketConfig = {
    BeehiveCorporation: {
      AndromedaOrganisation: {
        AcruxEnterprise: {
          ArionApplication: "../bSocket/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/aArionApplication/socketServer",
          AnkasApplication: "../bSocket/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/bAnkasApplication/socketServer",
          AbolApplication: "../bSocket/aBeehiveCorporation/aAndromedaOrganisation/aAcruxEnterprise/cAbolApplication/socketServer"
        },
        AnserEnterprise: {
          SwiftTalkApplication: "../bSocket/aBeehiveCorporation/aAndromedaOrganisation/bAnserEnterprise/aSwiftTalkApplication/socketServer"
        }
      },
      PinwheelOrganisation: {
        BeehiveApplication: "../bSocket/aBeehiveCorporation/bPinwheelOrganisation/aBeehiveApplication/socketServer",
        AndromedaApplication: "../bSocket/aBeehiveCorporation/bPinwheelOrganisation/bAndromedaApplication/socketServer",
        PinwheelApplication: "../bSocket/aBeehiveCorporation/bPinwheelOrganisation/cPinwheelApplication/socketServer",
        TadpoleApplication: "../bSocket/aBeehiveCorporation/bPinwheelOrganisation/dTadpoleApplication/socketServer",
        AcruxApplication: "../bSocket/aBeehiveCorporation/bPinwheelOrganisation/eAcruxEnterprise/socketServer",
        AnserApplication: "../bSocket/aBeehiveCorporation/bPinwheelOrganisation/fAnserApplication/socketServer",
        AquilaApplication: "../bSocket/aBeehiveCorporation/bPinwheelOrganisation/gAquilaApplication/socketServer",
        BellatrixApplication: "../bSocket/aBeehiveCorporation/bPinwheelOrganisation/hBellatrixApplication/socketServer",
        CapellaApplication: "../bSocket/aBeehiveCorporation/bPinwheelOrganisation/iCapellaApplication/socketServer"
      },
      TadpoleOrganisation: {
        BellatrixEnterprise: {
          TechfolioFirm: {
            TechfolioApplication: "../bSocket/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/aTechfolioAppliation/socketServer",
            ApurvChaturApplication: "../bSocket/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/bApurvChaturApplication/socketServer",
            AnushreeMandapeApplication: "../bSocket/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/cAnushreeMandapeApplication/socketServer",
            SofieBerkinApplication: "../bSocket/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/aTechfolioFirm/dSofieBerkinApplication/socketServer"
          },
          BlogifyFirm: {
            BlogifyApplication: "../bSocket/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/bBlogifyFirm/aBlogifyApplication/socketServer",
            SrimadBhagwatamApplication: "../bSocket/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/bBlogifyFirm/bSrimadBhagwatamApplication/socketServer",
            BhagwadGitaApplication: "../bSocket/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/bBlogifyFirm/cBhagwadGitaApplication/socketServer",
            InterviewQuestionApplication: "../bSocket/aBeehiveCorporation/cTadpoleOrganisation/bBellatrixEnterprise/bBlogifyFirm/dInterviewQuestionApplication/socketServer"
          }
        }
      }
    }
  };
  
  if (socketConfig[corporation] && socketConfig[corporation][organisation] && socketConfig[corporation][organisation][enterprise] && socketConfig[corporation][organisation][enterprise][firm]) {
    if (application && socketConfig[corporation][organisation][enterprise][firm][application]) {
      console.log("Succeed to connect to socket")
      socketServer = require(socketConfig[corporation][organisation][enterprise][firm][application]);
      return socketServer(server, app)
    } else {
      console.log("Failed to connect to socket")
    }
  } else if (socketConfig[corporation] && socketConfig[corporation][organisation] && socketConfig[corporation][organisation][enterprise]) {
    if (application && socketConfig[corporation][organisation][enterprise][application]) {
      console.log("Succeed to connect to socket")
      socketServer = require(socketConfig[corporation][organisation][enterprise][application]);
      return socketServer(server, app)
    } else {
      console.log("Failed to connect to socket")
    }  
  } else if (socketConfig[corporation] && socketConfig[corporation][organisation]) {
    if (application && socketConfig[corporation][organisation][application]) {
      console.log("Succeed to connect to socket")
      socketServer = require(socketConfig[corporation][organisation][application]);
      return socketServer(server, app);
    } else {
      console.log("Failed to connect to socket")
    }  
  } else {
    console.log("Failed to connect to socket")
  }
  
}

module.exports = socketApp