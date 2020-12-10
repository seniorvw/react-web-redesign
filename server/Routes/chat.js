var router = require("express").Router();
const appInsights = require('applicationinsights');
const telemetryClient = appInsights.defaultClient;

var ChatDB = require("../Database/chat");

router.get("/messages/:roomId", async (req, res) => {
  try {
    telemetryClient.trackNodeHttpRequest({ request: req, response: res });

    const roomId = req.params.roomId;
    chatDB = new ChatDB();
    var messages = await chatDB.getMessages(roomId);
    res.send({ success: true, data: messages });
  } catch (err) {
    telemetryClient.trackException({ exception: err });
    console.error(err);
    res.send({ success: false, message: err });
  }
});

module.exports = router;