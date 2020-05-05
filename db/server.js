const dotenv = require('dotenv');
dotenv.config();
const jsonServer = require('json-server');
const bcrypt = require('bcryptjs');
const util = require('util');
const cookieParser = require('cookie-parser');
const pause = require('connect-pause');
const redirects = require('./routes.json');
const {
  assignJWTToken,
  cookieSession,
  parseUserID,
  isAuthorized,
} = require('./utils');

const router = jsonServer.router('./db.json');
const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.rewriter(redirects));
server.use(jsonServer.bodyParser);

server.use(cookieSession);
server.use(cookieParser());
server.use(parseUserID);

server.use(pause(650));

server.use('/login', (req, res, next) => {
  if (req.query.auto == 'true') {
    const id = res.req.userID;
    if (!id) {
      return res.status(401).json({
        data: null,
        errors: [],
      });
    }
    const user = router.db.get('users').getById(id).cloneDeep().value();
    delete user.password;
    return res.status(200).json({
      data: user,
      errors: null,
    });
  }

  const { password, username } = req.body;
  if (!password || !username) {
    return res.status(400).json({
      data: null,
      errors: [
        { id: Date.now(), message: 'Missing parameters (╯°□°）╯︵ ┻━┻' },
      ],
    });
  }

  const user = router.db.get('users').find({ username }).cloneDeep().value();

  if (util.isUndefined(user)) {
    return res.status(401).json({
      data: null,
      errors: [
        {
          message: "User doesn't exists (╯ರ ~ ರ）╯︵ ┻━┻",
          id: Date.now(),
        },
      ],
    });
  }

  const isValid = bcrypt.compareSync(password, user.password);

  if (!isValid) {
    return res.status(401).json({
      data: null,
      errors: [
        {
          message: "Password doesn't match (╯ರ ~ ರ）╯︵ ┻━┻",
          id: Date.now(),
        },
      ],
    });
  }

  delete user.password;
  assignJWTToken(req.session, user.id);
  return res.status(200).json({
    data: user,
    errors: null,
  });
});

server.use('/logout', (req, res, next) => {
  req.session = null;
  req.userID = null;
  return res.sendStatus(204);
});

server.use((req, res, next) => {
  if (isAuthorized(req)) {
    next();
  } else {
    return res.status(401).json({
      data: null,
      errors: [
        {
          message: 'Log in before doing that ლ(ಠ_ಠლ)',
          id: Date.now(),
        },
      ],
    });
  }
});

router.render = (req, res) => {
  if (res.statusCode == 200 || res.statusCode == 201) {
    res.jsonp({
      data: res.locals.data,
      errors: null,
    });
  } else {
    const id = req.path.split('/').pop();
    res.jsonp({
      data: null,
      errors: [
        {
          message: 'Query related error',
          details: id,
        },
      ],
    });
  }
};

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running, check http://localhost:3001');
});
