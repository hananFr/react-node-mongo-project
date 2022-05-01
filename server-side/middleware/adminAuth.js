const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtKey'));
    req.user = decoded;
    if (!req.user.admin) res.status(401).send('Access denied')
    next();
  }
  catch (ex) {
    console.log('Invalid token.');
    res.status(400).send('Invalid token.');
  }
}