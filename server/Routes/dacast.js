var router = require("express").Router();
const fetch = require('node-fetch');
const appInsights = require('applicationinsights');
const telemetryClient = appInsights.defaultClient;

const { getFakeChannels } = require('./mockData');

const DACAST_BASE_URL = "https://api.dacast.com/v2";
const DACAST_LIVE_URL = "https://liverecording.dacast.com/l/status/live?contentId=181053_c_";
const DACAST_API_KEY = process.env.DACAST_API_KEY;

router.get("/channels", async (req, res) => {
  try {
    telemetryClient.trackNodeHttpRequest({ request: req, response: res });
    const filter = req.query.filter;

    if (filter == "fake") {
      res.send({ success: true, data: getFakeChannels() });
      return;
    }

    var channels = await (await fetch(DACAST_BASE_URL + "/channel?apikey=" + DACAST_API_KEY + "&_format=JSON")).json();
    if (filter === "live") {
      // Fetch the channels that are live.
      const liveChannels = await Promise.all(channels.data.map(async element => {
        const liveUrl = DACAST_LIVE_URL + element.id + "&apikey=" + DACAST_API_KEY + "&_format=JSON";
        const liveRes = await (await fetch(liveUrl)).json();
        if (liveRes.isLive) {
          return element
        }
      }));

      // Filter out undefined entries in the array. We cannot
      // use Filter above b/c it only supports synchronous calls.
      filteredChannels = liveChannels.filter(element => {
        return element !== undefined;
      });

      res.send({ success: true, data: filteredChannels })
    } else {
      res.send({ success: true, data: channels.data })
    }
  } catch (err) {
    telemetryClient.trackException({ exception: err });
    res.send({ success: false, message: err });
  }
});

router.get("/storedVideos", async (req, res) => {
  try {
    telemetryClient.trackNodeHttpRequest({ request: req, response: res });
    var videos = await (await fetch(DACAST_BASE_URL + "/vod?apikey=" + DACAST_API_KEY)).json();
    res.send({ success: true, data: videos.data })
  } catch (err) {
    telemetryClient.trackException({ exception: err });
    res.send({ success: false, message: err });
  }
});

module.exports = router;