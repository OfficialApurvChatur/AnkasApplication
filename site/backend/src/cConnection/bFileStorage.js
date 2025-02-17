const cloudinary = require('cloudinary');

const fileStorage = () => {
  if (process.env.APPLICATION === "BeehiveApplication") {
    cloudinary.config({
      cloud_name: 'dghwtoxsh',
      api_key: '544889684137735',
      api_secret: '7TaK50-Dn_qTOKuQ2AL09-iiQ5E'
    })
  } else if (process.env.APPLICATION === "AndromedaApplication") {
    cloudinary.config({
      cloud_name: 'dlvfg97qj',
      api_key: '211632761864738',
      api_secret: 'EPspVh7GdAvpjIDTqeCczfCAH00'
    })
  } else if (process.env.APPLICATION === "PinwheelApplication") {
    cloudinary.config({
      cloud_name: 'ds3cizki2',
      api_key: '164252863519729',
      api_secret: 'H9pPe_--InMjDSMi1W7hCQQ16LE'
    })
  } else if (process.env.APPLICATION === "TadpoleApplication") {
    cloudinary.config({
      cloud_name: 'dcjvq3nxs',
      api_key: '878297385766417',
      api_secret: 'K0svUEjgvLcos4wH8NQ1uiGWYiA'
    })
  } else if (process.env.APPLICATION === "AcruxApplication") {
    cloudinary.config({
      cloud_name: 'dleuqmtre',
      api_key: '583137637898995',
      api_secret: 'TR1U-rEhLf0Ci-MINTizjpdbaUE'
    })
  } else if (process.env.APPLICATION === "AnserApplication") {
    cloudinary.config({
      cloud_name: 'dq6doou2i',
      api_key: '177218719465557',
      api_secret: 'cA2GBsMsvMP9wIky1tgN9bkF1_g'
    })
  } else if (process.env.APPLICATION === "AquilaApplication") {
    cloudinary.config({
      cloud_name: 'ddocq5aco',
      api_key: '428853457473385',
      api_secret: '1g50fBBUHyTXHXHliKvUPF5Fs28'
    })
  } else if (process.env.APPLICATION === "BellatrixApplication") {
    cloudinary.config({
      cloud_name: 'dckhwlws8',
      api_key: '949283849318396',
      api_secret: '3_ETIHXEfY2Zn5RLBALYu4Hi1NM'
    })
  } else if (process.env.APPLICATION === "CapellaApplication") {
    cloudinary.config({
      cloud_name: 'dzsczicoa',
      api_key: '912914944799242',
      api_secret: 'w0xe028PGEyDZTmqnbokj6ZUaYo'
    })
  } else if (process.env.APPLICATION === "ArionApplication") {
    cloudinary.config({
      cloud_name: 'dnslejnrr',
      api_key: '716674692816216',
      api_secret: 'MxZz9Sfus4EJNVkTBshot_UMb54'
    })
  } else if (process.env.APPLICATION === "AnkasApplication") {
    cloudinary.config({
      cloud_name: 'do9okdccw',
      api_key: '366113932426574',
      api_secret: 'YVAb9U36_osINv4-ssafrvXMnDM'
    })
  } else if (process.env.APPLICATION === "AbolApplication") {
    cloudinary.config({
      cloud_name: 'dtti9gqlb',
      api_key: '519883224487222',
      api_secret: 'ei7W8nvPm56T4wP3MAdg1uRRfvc'
    })
  } else if (
    process.env.APPLICATION === "TechfolioApplication" ||
    process.env.APPLICATION === "ApurvChaturApplication" ||
    process.env.APPLICATION === "AnushreeMandapeApplication" ||
    process.env.APPLICATION === "SofieBerkinApplication"
  ) {
    cloudinary.config({
      cloud_name: 'dxej7qj3m',
      api_key: '631843469762522',
      api_secret: 'pJFo4RbFE66XC_OamtotssYXcbc'
    })
  } else if (process.env.APPLICATION === "BlogifyApplication") {
    cloudinary.config({
      cloud_name: 'dfl26kyfn',
      api_key: '147278958394249',
      api_secret: '0xvqB0iNVTb2iORviWuH-W3lSOM'
    })
  } else if (process.env.APPLICATION === "SrimadBhagwatamApplication") {
    cloudinary.config({
      cloud_name: 'djwjxlror',
      api_key: '359635818598356',
      api_secret: 'HXglMwXJr0vllu_T1RkmyJV2YKw'
    })
  } else if (process.env.APPLICATION === "BhagwadGitaApplication") {
    cloudinary.config({
      cloud_name: 'doyvohr4s',
      api_key: '633811678788218',
      api_secret: 'VfVI2fl13MIAl0jMEkAAZ5BeGx8'
    })
  } else if (process.env.APPLICATION === "InterviewQuestionApplication") {
    cloudinary.config({
      cloud_name: 'defelbc1m',
      api_key: '639314448993119',
      api_secret: 'Z4RWlLfYUIRMNzgzD-Dudzj2mvg'
    })
  } else {
    cloudinary.config({
      cloud_name: 'dprguhpph',
      api_key: '636787975923379',
      api_secret: 'wcFaz18DjoJCW5Z7isyzUGrHP9Q'
    })
  }
}

module.exports = fileStorage