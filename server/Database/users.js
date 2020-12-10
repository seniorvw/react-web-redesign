var sql = require("mssql");
var Database = require("../Database/database");

const appInsights = require('applicationinsights');
const telemetryClient = appInsights.defaultClient;

const DUPLICATE_ACCOUNT_ERROR = "Violation of UNIQUE KEY constraint 'UC_Email'";

// TODO verify that users cannot stay logged in when account is deleted.
class UsersDB extends Database {
    _TryAddUser(email, password, firstName, lastName) {
        return new Promise(async (resolve, reject) => {
            var inputValues = [
                { name: "iEmail", value: email },
                { name: "iPassword", value: password },
                { name: "iFirstName", value: firstName },
                { name: "iLastName", value: lastName }
            ]
            var outputValues = [{ name: "responseMessage" }];

            try {
                var result = await this._executeStoredProcedure(inputValues, outputValues, "dbo.uspAddUser");
                if (result.responseMessage == "Success") {
                    resolve(true);
                } else if (result.responseMessage.indexOf(DUPLICATE_ACCOUNT_ERROR) != -1) {
                    reject(new Error("Duplicate Account"));
                } else {
                    reject(new Error(`Failed to log in. ${result.responseMessage}`));
                }
            }
            catch (err) {
                console.error(err);
                telemetryClient.trackException({ exception: err });
                reject(err);
            };
        });
    }

    _TryUpdateProperty(propertyName, value, oldUser) {
        return new Promise(async (resolve, reject) => {
            const inputFields = [
                { name: "propertyName", type: sql.VarChar(255), value: propertyName },
                { name: "value", type: sql.VarChar(255), value: value },
                { name: "email", type: sql.VarChar(255), value: oldUser.email }
            ];

            try {
                await this._executeQuery(`UPDATE dbo.[User] SET @propertyName=@value WHERE Email=@email`, inputFields, false);
                resolve();
            } catch (err) {
                if (err.message.indexOf(DUPLICATE_ACCOUNT_ERROR) != -1) {
                    err = new Error("Duplicate Account");
                }
                console.error(err);
                telemetryClient.trackException({ exception: err });
                reject(err);
            }
        });
    }

    _TryUpdatePassword(password, oldUser) {
        return new Promise(async (resolve, reject) => {
            var inputValues = [
                { name: "iEmail", value: oldUser.email },
                { name: "iPassword", value: password }
            ];
            var outputValues = [{ name: "responseMessage" }];

            try {
                var result = await this._executeStoredProcedure(inputValues, outputValues, "dbo.uspUpdatePassword");
                if (result.responseMessage == "Success") {
                    resolve(true);
                } else {
                    reject("Failed to update password");
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    async _TryUpdateUser(oldUser, name, email, password) {
        const newUser = oldUser;
        try {
            if (name) {
                const firstName = name.split(" ")[0];
                const lastName = name.split(" ")[1];
                await this._TryUpdateProperty("FirstName", firstName, oldUser);
                await this._TryUpdateProperty("LastName", lastName, oldUser);
                newUser.name = name;
            }

            if (email) {
                await this._TryUpdateProperty("Email", email, oldUser);
                newUser.email = email;
            }

            if (password) {
                await this._TryUpdatePassword(password, oldUser);
            }

            return newUser;
        } catch (err) {
            throw err;
        }
    }

    _TryLogin(username, password) {
        return new Promise(async (resolve, reject) => {
            var inputValues = [
                { name: "iEmail", value: username },
                { name: "iPassword", value: password }
            ];
            var outputValues = [
                { name: "oResponseMessage" },
                { name: "oEmail" },
                { name: "oFirstName" },
                { name: "oLastName" }
            ];

            try {
                var result = await this._executeStoredProcedure(inputValues, outputValues, "dbo.uspLogin");
                if (result.oResponseMessage == "User successfully logged in") {
                    resolve(result);
                } else {
                    reject(new Error(`Failed to log in. ${result.oResponseMessage}`));
                }
            } catch (err) {
                reject(err);
            }
        });
    }

    _TryDeleteAccount(email) {
        return new Promise(async (resolve, reject) => {
            const inputFields = [
                { name: "email", type: sql.VarChar(255), value: email }
            ];

            try {
                await this._executeQuery(`DELETE FROM [dbo].[User] WHERE Email=@email`, inputFields);
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    _TryFetchDacastAccountInfo(email) {
        return new Promise(async (resolve, reject) => {
            const inputFields = [
                { name: "email", type: sql.VarChar(255), value: email }
            ];

            try {
                var result = await this._executeQuery(
                    `SELECT StreamUrl, StreamKey, Username, Password, ChannelId, Name FROM DacastAccountInfo WHERE Email=@email`,
                    inputFields);
                resolve(result[0]);
            } catch (err) {
                reject(err);
            }
        });
    }

    addUser(username, password, firstName, lastName) {
        return new Promise(async (resolve, reject) => {
            try {
                var result = await this._TryAddUser(username, password, firstName, lastName);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    updateUser(oldUser, name, email, password) {
        return new Promise(async (resolve, reject) => {
            try {
                var result = await this._TryUpdateUser(oldUser, name, email, password);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    login(username, password) {
        return new Promise(async (resolve, reject) => {
            try {
                var result = await this._TryLogin(username, password);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    deleteAccount(user) {
        return new Promise(async (resolve, reject) => {
            try {
                var result = await this._TryDeleteAccount(user.email)
                resolve(true);
            } catch (err) {
                reject(err);
            }
        });
    }

    fetchDacastAccountInfo(email) {
        return new Promise(async (resolve, reject) => {
            try {
                var result = await this._TryFetchDacastAccountInfo(email);
                resolve(result);
            } catch (err) {
                reject(err);
            }
        })
    }
}

module.exports = UsersDB;
