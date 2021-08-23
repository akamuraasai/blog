const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const headerKey = 'Bearer';

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === headerKey) {
      try {
        const token = parts[1];
        const decoded = jwt.verify(token, process.env.SECRET);
        req.decoded = decoded;
      } catch (error) {
        res.status(400).send(error);
      }
    }
  }

  return next();
};
