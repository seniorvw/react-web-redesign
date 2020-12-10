var router = require("express").Router();
const appInsights = require('applicationinsights');
const telemetryClient = appInsights.defaultClient;

var UsersDB = require("../Database/users");
const {
    authenticateJWT,
    removeRefreshToken
} = require("../Middleware/authMiddleware");
const {
    checkCharacters,
    JsonFailure
} = require("../Middleware/util");

router.post("/updateProfile", authenticateJWT, async (req, res) => {
    try {
        telemetryClient.trackNodeHttpRequest({ request: req, response: res });
        const data = req.body;
        const user = req.user;

        var db = new UsersDB();
        var newData = {};
        if (data.newPassword.length > 0) {
            if (data.oldPassword.length === 0) {
                return JsonFailure(res, "Missing Password");
            } else if (data.newPassword !== data.newPasswordConfirm) {
                return JsonFailure(res, "Mismatched Passwords");
            } else if (data.newPassword.length < 8 || !checkCharacters(data.newPassword)) {
                return JsonFailure(res, "Malformed Password");
            }

            try {
                await db.login(user.email, data.oldPassword);
                newData.password = data.newPassword;
            }
            catch (err) {
                telemetryClient.trackException({ exception: err });
                return JsonFailure(res, "Incorrect Password");
            }
        }

        if (data.email.length > 0) {
            if (data.email.indexOf("@") == -1 || data.email.indexOf("@") == data.email.length - 1) {
                return JsonFailure(res, "Malformed Email");
            }
            newData.email = data.email;
        }

        if (data.name.length > 0) {
            newData.name = data.name;
        }

        var newUser = await db.updateUser(user, newData.name, newData.email, newData.password);
        res.json({ success: true, user: newUser });
    } catch (err) {
        telemetryClient.trackException({ exception: err });
        JsonFailure(res, err.message);
    }
});

router.post("/delete", authenticateJWT, async (req, res) => {
    try {
        telemetryClient.trackNodeHttpRequest({ request: req, response: res });
        const { token } = req.body;
        const user = req.user;
        var db = new UsersDB();
        var success = await db.deleteAccount(user.email);
        removeRefreshToken(token);
        res.json({ success: success });
    } catch (err) {
        telemetryClient.trackException({ exception: err });
        JsonFailure(res, err.message);
    }
});

module.exports = router;