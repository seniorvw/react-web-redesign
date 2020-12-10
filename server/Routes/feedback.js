var router = require("express").Router();
var nodemailer = require('nodemailer');
const appInsights = require('applicationinsights');
var sql = require("mssql");
var DB = require("../Database/database");

const telemetryClient = appInsights.defaultClient;

const EMAIL_USERNAME = "info@trxr.tv";
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const streamerSignUpMessage = "Thank you! You should expect a response in the next 24 hours.";
const genericMessage = "Thank you for sending us an email. We will get back to you as soon as possible";

const DUPLICATE_EMAIL_ERROR = "Violation of UNIQUE KEY constraint";

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

function sendEmail(mailOptions, isStreamerSignUp, res) {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.statusCode = 500;
            telemetryClient.trackException({ exception: error });
            res.send({ success: false, message: "Sorry that didnt work. Please try again." })
        } else {
            const message = isStreamerSignUp ? streamerSignUpMessage : genericMessage;
            res.send({ success: true, message })
        }
    });
}

// An api endpoint that sends feedback as an email to info@trxr.tv
router.post("/sendEmail", async (req, res) => {
    try {
        telemetryClient.trackNodeHttpRequest({ request: req, response: res });
        let { email, subject, name, message, isStreamerSignUp, shouldCC, saveEmailToDB } = req.body;

        if (name) {
            message = "Name: " + name + " " + message;
        }

        var mailOptions = {
            from: EMAIL_USERNAME,
            to: EMAIL_USERNAME,
            subject: subject,
            text: message
        };

        if (shouldCC) {
            mailOptions.cc = email;
        }

        if (saveEmailToDB) {
            var db = new DB();
            const inputFields = [
                { name: "email", type: sql.VarChar(255), value: email }
            ];

            try {
                await db._executeQuery(`INSERT INTO dbo.[Newsletter] (Email) VALUES (@email)`, inputFields, false)
                sendEmail(mailOptions, isStreamerSignUp, res);
            } catch (err) {
                if (err.message.indexOf(DUPLICATE_EMAIL_ERROR) != -1) {
                    sendEmail(mailOptions, isStreamerSignUp, res);
                } else {
                    res.send({ success: false, message: "Sorry that didnt work. Please try again." })
                }
            }
        } else {
            sendEmail(mailOptions, isStreamerSignUp, res);
        }
    } catch (err) {
        telemetryClient.trackException({ exception: err });
        res.send({ success: false, message: err });
    }
});

module.exports = router;