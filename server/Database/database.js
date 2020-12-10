var sql = require("mssql");
const appInsights = require('applicationinsights');
const telemetryClient = appInsights.defaultClient;

class Database {
  constructor() {
    this._dbConfig = {
      server: "p13041.database.windows1.com",
      database: "p13041",
      user: "sleneza1",
      password: this._getDBPat(),
      port: 1433,
      options: {
        encrypt: true,
        enableArithAbort: false
      }
    };
  }

  _getDBPat() {
    return "p13041";
  }

  _checkNotEmpty(str) {
    return str && str.length > 0;
  }

  _executeQuery(queryString, inputFields, returnRecordSets = false) {
    return new Promise(async (resolve, reject) => {
      try {
        // Create connection to DB
        var conn = new sql.ConnectionPool(this._dbConfig);

        // Start connection
        await conn.connect();
        // Create request instance, passing in connection instance
        var req = new sql.Request(conn);

        // Add input parameters to query.
        for (var inputField of inputFields) {
          req.input(inputField.name, inputField.type, inputField.value);
        }

        var result = await req.query(queryString);
        conn.close();
        if (returnRecordSets) {
          resolve(result.recordsets);
        } else {
          resolve(result.recordset);
        }
      } catch (err) {
        console.error(err);
        if (telemetryClient) {
          telemetryClient.trackException({ exception: err });
        }
        reject(err);
      }
    });
  }

  _executeStoredProcedure(inputValues, outputValues, procedure) {
    return new Promise(async (resolve, reject) => {
      try {
        // Create connection to DB
        var conn = new sql.ConnectionPool(this._dbConfig);

        // Start connection
        await conn.connect();

        // Create request instance, passing in connection instance
        var req = new sql.Request(conn);

        // Add input parameters
        for (var inputVar of inputValues) {
          console.log(
            `Adding input param ${inputVar.name} : ${inputVar.value}`
          );
          req.input(inputVar.name, inputVar.value);
        }

        // Add output parameters
        for (var outputVar of outputValues) {
          console.log(`Adding output param ${outputVar.name}`);
          req.output(outputVar.name);
        }

        console.log(`Trying to execute ${procedure}`);
        var res = await req.execute(procedure);
        resolve(res.output);
      } catch (err) {
        console.error(err);
        telemetryClient.trackException({ exception: err });
        reject(err);
      }
    });
  }
}

module.exports = Database;
