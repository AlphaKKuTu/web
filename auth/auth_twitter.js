const config = require('../auth.json')

module.exports.config = {
  Strategy: require('passport-twitter').Strategy,
  color: '#55ACEE',
  fontColor: '#FFFFFF',
  vendor: 'twitter',
  displayName: 'withTwitter',
  'useoAuth-buttons': true
}

module.exports.strategyConfig = {
  consumerKey: config.twitter.consumerKey, // 보안을 위해서입니다.
  consumerSecret: config.twitter.consumerSecret, // 이 방법을 사용하는 것을
  callbackURL: config.twitter.callbackURL, // 적극 권장합니다.
  passReqToCallback: true
}

module.exports.Strategy = (process, MainDB, Ajae) => {
  return (req, accessToken, refreshToken, profile, done) => {
    const $p = {}

    $p.authType = 'twitter'
    $p.id = 'twitter-' + profile.id
    $p.name = profile.displayName
    $p.title = profile.displayName
    $p.image = profile.photos[0].value

    process(req, accessToken, MainDB, $p, done)
  }
}
