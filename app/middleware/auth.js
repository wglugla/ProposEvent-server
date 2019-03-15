import jwt from 'jsonwebtoken';

module.exports.ensureToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, result) => {
      if (err) {
        res.sendStatus(403)
      } else {
        next();
      }
    })
  } else {
    res.sendStatus(403);
  }
}