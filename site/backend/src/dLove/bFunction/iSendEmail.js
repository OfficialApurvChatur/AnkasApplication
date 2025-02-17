const nodemailer = require("nodemailer");

let auth 

switch (process.env.CORPORATION) {
  case 'BeehiveCorporation':

    switch (process.env.ORGANISATION) {
      case 'AndromedaOrganisation':
          
        switch (process.env.ENTERPRISE) {
          case 'AcruxEnterprise':

            switch (process.env.APPLICATION) {
              case 'ArionApplication':
                auth = {
                  user: 'soup.arion@gmail.com',
                  pass: 'mzngt qlri jfxr krfs'
                } 
                break;
              case 'AnkasApplication':
                auth = {
                  user: 'soup.ankas@gmail.com',
                  pass: 'udff mgvz gict dfzg'
                }   
                break;
              case 'AbolApplication':
                auth = {
                  user: 'suop.abol@gmail.com',
                  pass: 'wjsf ptdw gqno geif'
                } 
                break;
              default:
                break;
            }   
            break;

          case 'AnserEnterprise':

            switch (process.env.APPLICATION) {
              case 'ChatoApplication':
                auth = {
                  user: 'suop.abol@gmail.com',
                  pass: 'wjsf ptdw gqno geif'
                } 
                break;
              default:
                break;
            }   
            break;
              
          default:
            break;
        }   
        break;

      case 'PinwheelOrganisation':

        switch (process.env.APPLICATION) {
          case 'BeehiveApplication':
            auth = {
              user: 'soup.beehive.corporation@gmail.com',
              pass: 'ehrt bmgg slgp pkej'
            } 
            break;
          case 'AndromedaApplication':
            auth = {
              user: 'andromeda.organisation@gmail.com',
              pass: 'lkfa ildq frec bajl'
            } 
            break;
          case 'PinwheelApplication':
            auth = {
              user: 'pinwheel.organisation@gmail.com',
              pass: 'prnx njjk udaf ctuh'
            } 
            break;
          case 'TadpoleApplication':
            auth = {
              user: 'tadpole.organisation@gmail.com',
              pass: 'wgmh jheq zozp gilw'
            } 
            break;
          case 'AcruxApplication':
            auth = {
              user: 'soup.acrux.enterprise@gmail.com',
              pass: 'fyww bmaf nhxx juxz'
            } 
            break;
          case 'AnserApplication':
            auth = {
              user: 'soup.anser.enterprise@gmail.com',
              pass: 'mkwn fpvo kcxh nsdn'
            } 
            break;
          case 'AquilaApplication':
            auth = {
              user: 'soup.aquila.enterprise@gmail.com',
              pass: 'arhh vjkm scab laid'
            } 
            break;
          case 'BellatrixApplication':
            auth = {
              user: 'soup.bellatrix.enterprise@gmail.com',
              pass: 'rffk iucp njaq tmnq'
            } 
            break;
          case 'CapellaApplication':
            auth = {
              user: 'soup.capella.enterprise@gmail.com',
              pass: 'prcc xrsi qvvc ewuh'
            } 
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
                    auth = {
                      user: 'techfolio.firm@gmail.com',
                      pass: 'slcb qfsh xseq kdyq'
                    } 
                    break;
    
                  default:
                    break;
                }   
                break;

              case 'BlogifyFirm':
                switch (process.env.APPLICATION) {

                  case 'BlogifyApplication':
                    auth = {
                      user: 'blogify.firm@gmail.com',
                      pass: 'hujs nrek qzev ukpb'
                    } 
                    break;
    
                  case 'SrimadBhagwatamApplication':
                    auth = {
                      user: 'soup.srimad.bhagwatam@gmail.com',
                      pass: 'qrug ajlm nlod qcpi'
                    } 
                    break;
      
                  case 'BhagwadGitaApplication':
                    auth = {
                      user: 'soup.bhagwad.gita@gmail.com',
                      pass: 'uuxe rmkc chox rhpq'
                    } 
                    break;
        
                  case 'InterviewQuestionApplication':
                    auth = {
                      user: 'soup.interview.question@gmail.com',
                      pass: 'wybd zblr vhdo laxb'
                    } 
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
    auth = {
      user: 'imapurvchatur@gmail.com',
      pass: 'mzlr fhcd ombm armh'
    } 
    break;
}


const sendEmail = async (option) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: auth
    });
  
    const mailOptions = {
      from: option.from,
      to: option.to,
      subject: option.subject,
      text: option.text
    };
  
    transporter.sendMail(mailOptions, 
      (error, info) => {
        if (error) {
          console.log("Some Error")
        } else {
          console.log("Success")
        }
      }
    );
  } catch (error) {
    console.log("Some Error")
  }
};

module.exports = sendEmail;