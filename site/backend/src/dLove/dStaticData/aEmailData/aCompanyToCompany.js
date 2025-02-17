let companyToCompany 


switch (process.env.CORPORATION) {
  case 'BeehiveCorporation':

    switch (process.env.ORGANISATION) {
      case 'AndromedaOrganisation':
          
        switch (process.env.ENTERPRISE) {
          case 'AcruxEnterprise':

            switch (process.env.APPLICATION) {
              case 'ArionApplication':
                companyToCompany = 'soup.arion@gmail.com'
                break;
              case 'AnkasApplication':
                companyToCompany = 'soup.ankas@gmail.com'
                break;
              case 'AbolApplication':
                companyToCompany = 'suop.abol@gmail.com'
                break;
              default:
                break;
            }   
            break;

          case 'AnserEnterprise':
            break;
              
          default:
            break;
        }   
        break;

      case 'PinwheelOrganisation':

        switch (process.env.APPLICATION) {
          case 'BeehiveApplication':
            companyToCompany = 'soup.beehive.corporation@gmail.com'
            break;
          case 'AndromedaApplication':
            companyToCompany = 'andromeda.organisation@gmail.com'
            break;
          case 'PinwheelApplication':
            companyToCompany = 'pinwheel.organisation@gmail.com'
            break;
          case 'TadpoleApplication':
            companyToCompany = 'tadpole.organisation@gmail.com'
            break;
          case 'AcruxApplication':
            companyToCompany = 'soup.acrux.enterprise@gmail.com'
            break;
          case 'AnserApplication':
            companyToCompany = 'soup.anser.enterprise@gmail.com'
            break;
          case 'AquilaApplication':
            companyToCompany = 'soup.aquila.enterprise@gmail.com'
            break;
          case 'BellatrixApplication':
            companyToCompany = 'soup.bellatrix.enterprise@gmail.com'
            break;
          case 'CapellaApplication':
            companyToCompany = 'soup.capella.enterprise@gmail.com'
            break;
          default:
            break;
        }   
        break;

      case 'TadpoleOrganisation':

        switch (process.env.ENTERPRISE) {

          case 'AquilaEnterprise':
            break;
              
          case 'BellatrixEnterprise':

            switch (process.env.FIRM) {
              case 'TechfolioFirm':

                switch (process.env.APPLICATION) {
                  case 'TechfolioApplication':
                  case 'ApurvChaturApplication':
                  case 'AnushreeMandapeApplication':  
                  case 'SofieBerkinApplication':  
                    companyToCompany = 'techfolio.firm@gmail.com'
                    break;

                  default:
                    break;
                }   
                break;

              case 'BLogifyFirm':

                switch (process.env.APPLICATION) {
                  case 'BlogifyApplication':
                    companyToCompany = 'blogify.firm@gmail.com'
                    break;

                  case 'SrimadBhagwatamApplication':
                    companyToCompany = 'soup.srimad.bhagwatam@gmail.com'
                    break;
  
                  case 'BhagwadGitaApplication':
                    companyToCompany = 'soup.bhagwad.gita@gmail.com'
                    break;

                  case 'InterviewQuestionApplication':
                    companyToCompany = 'soup.interview.question@gmail.com'
                    break;
      
                  default:
                    break;
                }   
                break;

              default:
                break;
            }   
            break;

          case 'CapellaEnterprise':
            break;
              
          default:
            break;
        }   
        break;
    }  
    break;

  default:
    companyToCompany = 'imapurvchatur@gmail.com'
    break;
}

module.exports = companyToCompany;