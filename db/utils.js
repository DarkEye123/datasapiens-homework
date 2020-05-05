const cs = require('cookie-session');
const { verify, sign } = require('jsonwebtoken');

const cookieSession = cs({
  name: 'datasapiens-session',
  secret: process.env.COOKIE_SECRET,
  maxAge: 24 * 60 * 60 * 1000 * 30, // 30 days
  httpOnly: true,
});

function parseUserID(req, res, next) {
  if (!req.session) {
    next();
  } else {
    const { token } = req.session;
    if (token) {
      const { userID } = verify(token, process.env.APP_SECRET);
      req.userID = userID;
    }
    next();
  }
}

function assignJWTToken(session, id) {
  const token = sign({ userID: id }, process.env.APP_SECRET);
  session.token = token;
}

function isAuthorized(req) {
  return !!req.userID;
}

module.exports = {
  parseUserID,
  assignJWTToken,
  cookieSession,
  isAuthorized,
};
