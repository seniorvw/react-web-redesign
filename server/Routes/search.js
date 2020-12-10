var router = require("express").Router();
const fetch = require('node-fetch');
const appInsights = require('applicationinsights');
const telemetryClient = appInsights.defaultClient;

const DACAST_BASE_URL = "https://api.dacast.com/v2";
const DACAST_API_KEY = "181053_9a74da5a02d09f1dd5ba";

router.get("/", async (req, res) => {
  try {
    telemetryClient.trackNodeHttpRequest({ request: req, response: res });
    channels = await (await fetch(DACAST_BASE_URL + "/channel?apikey=" + DACAST_API_KEY + "&_format=JSON")).json()
    var searchData = []
    channels.data.map(c => {
      searchData.push({
        display_name: c.title,
        channel: c
      });
    })
    res.send({ success: true, data: searchData })
  } catch (err) {
    telemetryClient.trackException({ exception: err });
    res.send({ success: false, message: err })
  }
});

module.exports = router;