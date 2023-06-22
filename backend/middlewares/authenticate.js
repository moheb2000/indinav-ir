const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, 'hello');
    req.autherId = decoded.autherId;
    next();
  } catch(err) {
    return res.status(401).json({ error: 'برای انجام این دستور، نیاز به ورود به صفحه کاربری دارید!' });
  }
};

module.exports = authenticate;
