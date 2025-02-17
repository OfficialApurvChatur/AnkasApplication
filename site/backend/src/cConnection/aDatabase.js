const mongoose = require('mongoose');

const database = () => {
    var DB_URL
        
    switch (process.env.CORPORATION) {
        case 'BeehiveCorporation':
    
            switch (process.env.ORGANISATION) {
                case 'AndromedaOrganisation':
                    
                    switch (process.env.ENTERPRISE) {
                        case 'AcruxEnterprise':

                            switch (process.env.APPLICATION) {
                                case 'ArionApplication':
                                    DB_URL = "mongodb+srv://souparion:ApurvChatur@cluster0.dev9qox.mongodb.net/ArionApplicationUltimate"
                                    break;
                                case 'AnkasApplication':
                                    DB_URL = "mongodb+srv://soupankas:ApurvChatur@cluster0.56vgcmj.mongodb.net/AnkasApplicationUltimate"
                                    break;
                                case 'AbolApplication':
                                    DB_URL = "mongodb+srv://suopabol:ApurvChatur@cluster0.wudskhv.mongodb.net/AbolApplicationUltimate"
                                    break;
                                default:
                                    break;
                            }   
                            break;

                        case 'AnserEnterprise':

                            switch (process.env.APPLICATION) {
                                case 'SwiftTalkApplication':
                                    DB_URL = "mongodb+srv://soupanserenterprise:ApurvChatur@cluster0.a468ggz.mongodb.net/SwiftTalkApplicationUltimate"
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
                            DB_URL = "mongodb+srv://soupbeehivecorporation:ApurvChatur@cluster0.c7fcx3r.mongodb.net/BeehiveApplicationUltimate"
                            break;
                        case 'AndromedaApplication':
                            DB_URL = "mongodb+srv://andromedaorganisation:ApurvChatur@cluster0.theuem4.mongodb.net/AndromedaApplicationUltimate"
                            break;
                        case 'PinwheelApplication':
                            DB_URL = "mongodb+srv://pinwheelorganisation:ApurvChatur@cluster0.ydz6j2q.mongodb.net/PinwheelApplicationUltimate"
                            break;
                        case 'TadpoleApplication':
                            DB_URL = "mongodb+srv://tadpoleorganisation:ApurvChatur@cluster0.72zhod4.mongodb.net/TadpoleApplicationUltimate"
                            break;
                        case 'AcruxApplication':
                            DB_URL = "mongodb+srv://soupacruxenterprise:ApurvChatur@cluster0.gpfw9vt.mongodb.net/AcruxApplicationUltimate"
                            break;
                        case 'AnserApplication':
                            DB_URL = "mongodb+srv://soupanserenterprise:ApurvChatur@cluster0.a468ggz.mongodb.net/AnserApplicationUltimate"
                            break;
                        case 'AquilaApplication':
                            DB_URL = "mongodb+srv://soupaquilaenterprise:ApurvChatur@cluster0.8voay2a.mongodb.net/AquilaApplicationUltimate"
                            break;
                        case 'BellatrixApplication':
                            DB_URL = "mongodb+srv://soupbellatrixenterprise:ApurvChatur@cluster0.k8vsy7b.mongodb.net/BellatrixApplicationUltimate"
                            break;
                        case 'CapellaApplication':
                            DB_URL = "mongodb+srv://soupcapellaenterprise:ApurvChatur@cluster0.ktcilqi.mongodb.net/CapellaApplicationUltimate"
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
                                            DB_URL = "mongodb+srv://techfoliofirm:ApurvChatur@cluster0.zijm9sj.mongodb.net/TechfolioApplicationUltimate"
                                            break;
                                        case 'ApurvChaturApplication':
                                            DB_URL = "mongodb+srv://techfoliofirm:ApurvChatur@cluster0.zijm9sj.mongodb.net/ApurvChaturApplicationUltimate"
                                            break;
                                        case 'AnushreeMandapeApplication':
                                            DB_URL = "mongodb+srv://techfoliofirm:ApurvChatur@cluster0.zijm9sj.mongodb.net/AnushreeMandapeApplicationUltimate"
                                            break;
                                        case 'SofieBerkinApplication':
                                            DB_URL = "mongodb+srv://techfoliofirm:ApurvChatur@cluster0.zijm9sj.mongodb.net/SofieBerkinApplicationUltimate"
                                            break;
                                        default:
                                            break;
                                    }   
                                    break;

                                case 'BlogifyFirm':

                                    switch (process.env.APPLICATION) {
                                        case 'BlogifyApplication':
                                            DB_URL = "mongodb+srv://blogifyfirm:ApurvChatur@cluster0.hpgxamo.mongodb.net/BlogifyApplicationUltimate"
                                            break;
                                        case 'SrimadBhagwatamApplication':
                                            DB_URL = "mongodb+srv://blogifyfirm:ApurvChatur@cluster0.hpgxamo.mongodb.net/SrimadBhagwatamApplicationUltimate"
                                            break;
                                        case 'BhagwadGitaApplication':
                                            DB_URL = "mongodb+srv://blogifyfirm:ApurvChatur@cluster0.hpgxamo.mongodb.net/BhagwadGitaApplicationUltimate"
                                            break;
                                        case 'InterviewQuestionApplication':
                                            DB_URL = "mongodb+srv://blogifyfirm:ApurvChatur@cluster0.hpgxamo.mongodb.net/InterviewQuestionApplicationUltimate"
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
            DB_URL = "mongodb+srv://AlwaysCoolUser:AlwaysCool@apurvchatur.ods89az.mongodb.net/SomeOtherStuff"
            break;
    }
    

    mongoose.set('strictQuery', true);
    mongoose
    .connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(response => {
        console.log(`Great!... Mongo DB connected with ${process.env.APPLICATION} on server: ${response.connection.host}`)
    })
    // .catch(error => {
    //     console.log(error)
    // })    
}

module.exports = database