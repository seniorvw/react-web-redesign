var router = require("express").Router();
const jwt = require('jsonwebtoken');
const appInsights = require('applicationinsights');
const telemetryClient = appInsights.defaultClient;

var UsersDB = require("../Database/users");
const { accessTokenSecret,
  refreshTokenSecret,
  addRefreshToken,
  removeRefreshToken,
  refreshTokenExists } = require("../Middleware/authMiddleware");
const {
  checkCharacters,
  JsonFailure
} = require("../Middleware/util");

// An api endpoint that logs a user in
router.post("/login", async (req, res) => {
  try {
    telemetryClient.trackNodeHttpRequest({ request: req, response: res });
    const body = req.body;

    var db = new UsersDB();
    var result = await db.login(body.email, body.password);
    let name = [result.oFirstName, result.oLastName].join(" ");
    // If the user hasn't supplied their name, return the email.
    if (name.length == 0) {
      name = result.oEmail;
    }

    var dacast_account_info = await db.fetchDacastAccountInfo(result.oEmail);
    const user = { name: name, email: result.oEmail, dacast_account_info: dacast_account_info }
    const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: '20m' });
    const refreshToken = jwt.sign(user, refreshTokenSecret);
    addRefreshToken(refreshToken);

    res.json({
      success: true,
      accessToken,
      refreshToken
    });
  } catch (err) {
    telemetryClient.trackException({ exception: err });
    JsonFailure(res, err);
  }
});

router.post('/logout', (req, res) => {
  try {
    telemetryClient.trackNodeHttpRequest({ request: req, response: res });
    const { token } = req.body;
    removeRefreshToken(token);

    res.send({ success: true, });
  } catch (err) {
    telemetryClient.trackException({ exception: err });
    JsonFailure(res, err);
  }
});

// An api endpoint that registers a new user
router.post("/signUp", async (req, res) => {
  try {
    telemetryClient.trackNodeHttpRequest({ request: req, response: res });
    const body = req.body;

    const email = body.email.trim();
    if (email.length == 0) {
      return JsonFailure(res, "Malformed Email");
    } else if (email.indexOf("@") == -1 || email.indexOf("@") == email.length - 1) {
      return JsonFailure(res, "Malformed Email");
    }

    const password = body.password.trim();
    if (password.length < 8 || !checkCharacters(password)) {
      return JsonFailure(res, "Malformed Password");
    }

    var db = new UsersDB();
    var result = await db.addUser(email, password, body.firstName, body.lastName);
    if (result == true) {
      let name = [body.firstName, body.lastName].join(" ");
      // If the user hasn't supplied their name, return the email.
      if (name.length == 0) {
        name = body.email;
      }

      const user = { name: name, email: body.email, dacast_account_info: {} }
      const accessToken = jwt.sign(user, accessTokenSecret, { expiresIn: '20m' });
      const refreshToken = jwt.sign(user, refreshTokenSecret);
      addRefreshToken(refreshToken);

      res.json({
        success: true,
        accessToken,
        refreshToken
      });
    } else {
      return JsonFailure(res, "Failed to create account.");
    }
  } catch (err) {
    telemetryClient.trackException({ exception: err });
    return JsonFailure(res, "Failed to create account.");
  }
});

router.post('/token', async (req, res) => {
  try {
    telemetryClient.trackNodeHttpRequest({ request: req, response: res });
    const { token } = req.body;

    if (!token) {
      return res.sendStatus(401);
    }

    var exists = await refreshTokenExists(token)
    if (!exists) {
      return res.sendStatus(403);
    }

    jwt.verify(token, refreshTokenSecret, (err, user) => {
      if (err) {
        telemetryClient.trackException({ exception: err });
        return res.sendStatus(403);
      }

      const updatedUser = { name: user.name, email: user.email, dacast_account_info: user.dacast_account_info }
      const accessToken = jwt.sign(updatedUser, accessTokenSecret, { expiresIn: '20m' });

      res.json({
        accessToken
      });
    });
  } catch (err) {
    telemetryClient.trackException({ exception: err });
    JsonFailure(res, err);
  }
});

module.exports = router;
