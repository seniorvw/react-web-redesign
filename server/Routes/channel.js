var router = require("express").Router();
var nodemailer = require('nodemailer');
const appInsights = require('applicationinsights');
const telemetryClient = appInsights.defaultClient;

var sql = require("mssql");
var DB = require("../Database/database");

const EMAIL_USERNAME = "info@trxr.tv";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

var transporter = nodemailer.createTransport({
    host: "smtpout.secureserver.net",
    secure: true,
    secureConnection: false, // TLS requires secureConnection to be false
    tls: {
        ciphers: 'SSLv3'
    },
    requireTLS: true,
    port: 465,
    debug: true,
    auth: {
        user: EMAIL_USERNAME,
        pass: EMAIL_PASSWORD
    }
});

function sendEmail(email, streamer, channelId) {
    var mailOptions = {
        from: EMAIL_USERNAME,
        to: email,
        subject: "One of your favorite streamers is going live!",
        text: `${streamer} is going live. Head to trxr.tv/channel/${channelId} to watch.`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.statusCode = 500;
            telemetryClient.trackException({ exception: error });
        }
    });
}

router.post("/follow", async (req, res) => {
    try {
        telemetryClient.trackNodeHttpRequest({ request: req, response: res });

        const { email, channelId } = req.body;

        const inputFields = [
            { name: "email", type: sql.VarChar(255), value: email },
            { name: "roomId", type: sql.INT, value: channelId }
        ];

        db = new DB();
        await db._executeQuery(`INSERT INTO dbo.[ChannelSubscriptions] (email, roomId) VALUES (@email, @roomId)`, inputFields, false);
        res.send({ success: true });
    } catch (err) {
        telemetryClient.trackException({ exception: err });
        console.error(err);
        res.send({ success: false, message: err });
    }
});


router.post("/notify", async (req, res) => {
    try {
        telemetryClient.trackNodeHttpRequest({ request: req, response: res });

        console.log(req.body);
        const { channelId, streamerName } = req.body;

        const inputFields = [
            { name: "roomId", type: sql.INT, value: channelId }
        ];

        db = new DB();
        var results = await db._executeQuery(
            `SELECT email, roomId FROM dbo.[ChannelSubscriptions] WHERE roomId=@roomId`,
            inputFields, false);
        results.forEach(db_res => {
            sendEmail(db_res["email"], streamerName, channelId);
        });
        res.send({ success: true });
    } catch (err) {
        telemetryClient.trackException({ exception: err });
        console.error(err);
        res.send({ success: false, message: err });
    }
});

module.exports = router;