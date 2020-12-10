var sql = require("mssql");
var Database = require("../Database/database");

const appInsights = require('applicationinsights');
const telemetryClient = appInsights.defaultClient;

class ChatDB extends Database {
  getMessages(roomId) {
    return new Promise(async (resolve, reject) => {
      const inputFields = [
        { name: "roomId", type: sql.INT, value: roomId }
      ];

      try {
        var results = await this._executeQuery(
          `SELECT * FROM ChatRoomMessages WHERE roomId=@roomId ORDER BY timestamp`, inputFields);
        resolve(results);
      } catch (err) {
        console.error(err);
        telemetryClient.trackException({ exception: err });
        reject(err);
      }
    });
  }

  postMessage(roomId, author, message) {
    return new Promise(async (resolve, reject) => {
      const inputFields = [
        { name: "roomId", type: sql.INT, value: roomId },
        { name: "author", type: sql.VarChar(255), value: author },
        { name: "message", type: sql.Text, value: message }
      ];

      try {
        var results = await this._executeQuery(
          `INSERT INTO ChatRoomMessages VALUES(@roomId, @author, @message, CURRENT_TIMESTAMP)`, inputFields);
        resolve(results);
      } catch (err) {
        console.error(err);
        telemetryClient.trackException({ exception: err });
        reject(err);
      }
    });
  }
}

module.exports = ChatDB;
