import jwt from 'jsonwebtoken';

module.exports.ensureToken = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, result) => {
      if (err) {
        res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports.verifyUser = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, result) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(`${result.user_id} : ${req.params.id}`);
        if (result.user_id == req.params.id) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
};

module.exports.verifyEventOwner = (req, res, next) => {
  const bearerHeader = req.headers['authorization'];
  if (bearerHeader) {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.SECRET_KEY, (err, result) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log('CALY STATUS: ', req.body.owner_id);
        if (result.user_id == req.body.owner_id) {
          next();
        } else {
          res.sendStatus(403);
        }
      }
    });
  } else {
    res.sendStatus(403);
  }
};
