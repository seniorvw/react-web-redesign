const express = require("express");
const http = require("http");
const path = require("path");
var ChatDB = require("./Database/chat");

/**
 * Load variables from .env file when running locally.
 */
if (process.env.NODE_ENV !== "production") {
  console.log("Loading variables from .env file.");
  require("dotenv").config();
}

/**
 * Set up Application Insights for the server.
 */
const appInsights = require('applicationinsights');
appInsights.setup()
  .setAutoDependencyCorrelation(true)
  .setAutoCollectRequests(true)
  .setAutoCollectPerformance(true, true)
  .setAutoCollectExceptions(true)
  .setAutoCollectDependencies(true)
  .setAutoCollectConsole(true)
  .setUseDiskRetryCaching(true)
  .setSendLiveMetrics(false)
  .setDistributedTracingMode(appInsights.DistributedTracingModes.AI)
  .start();
const telemetryClient = appInsights.defaultClient;

const app = express();

/**
 * Serve the static files from the React app.
 */
app.use(express.static(path.join(__dirname, "..", "client", "build")));

/**
 * Parse URL-encoded (as sent by HTML forms)
 * and JSON bodies (as sent by API clients).
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/**
 * Add all of our custom routes to the server.
 * TODO switch from async promises to regular async functions.
 */
app.use("/api/v1/auth", require("./Routes/authentication"));
app.use("/api/v1/user", require("./Routes/user"));
app.use("/api/v1/feedback", require("./Routes/feedback"));
app.use("/api/v1/search", require("./Routes/search"));
app.use("/api/v1/dacast", require("./Routes/dacast"));
app.use("/api/v1/chat", require("./Routes/chat"));
app.use("/api/v1/channel", require("./Routes/channel"));

/**
 * Handles any requests that don't match the ones above
 */
app.get("*", (req, res) => {
  telemetryClient.trackNodeHttpRequest({ request: req, response: res });
  const p = path.join(__dirname, "..", "client", "build", "index.html");
  res.sendFile(p);
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || 5000;
app.set("port", port);

telemetryClient.trackEvent({
  "name": "set-up",
  "properties": {
    "port": port
  }
});

/**
 * Create HTTP server.
 */
const server = http.createServer(app);
const io = require("socket.io")(server);
io.on("connection", socket => {
  socket.on("join", async room => {
    socket.join(room);
    io.emit("roomJoined", room);
  });

  socket.on("message", async data => {
    const db = new ChatDB();
    const { roomId, author, message } = data;
    const chatMessage = await db.postMessage(roomId, author, message);
    io.emit("newMessage", chatMessage);
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // Handle specific listen errors with friendly messages.
  console.log("App is listening on port " + port);
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      telemetryClient.trackEvent({
        "name": "onError",
        "properties": {
          "bind": bind,
          "error": "Bind requires elevated privileges"
        }
      });
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      telemetryClient.trackEvent({
        "name": "onListening",
        "properties": {
          "bind": bind,
          "error": "Bind is already in use"
        }
      });
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
  telemetryClient.trackEvent({
    "name": "onListening",
    "properties": {
      "bind": bind
    }
  });
} 
