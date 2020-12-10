var sql = require("mssql");
const jwt = require('jsonwebtoken');

var Database = require("../Database/database");

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const addRefreshToken = (refreshToken) => {
    var db = new Database();
    const inputFields = [
        { name: "refreshToken", type: sql.VarChar(255), value: refreshToken }
    ];

    db._executeQuery(`INSERT INTO RefreshTokens (Token) VALUES(@refreshToken)`, inputFields);
}

const removeRefreshToken = (refreshToken) => {
    var db = new Database();
    const inputFields = [
        { name: "refreshToken", type: sql.VarChar(255), value: refreshToken }
    ];

    db._executeQuery(`DELETE FROM RefreshTokens WHERE Token=@refreshToken`, inputFields);
}

const refreshTokenExists = async (refreshToken) => {
    return new Promise(async resolve => {
        var db = new Database();
        const inputFields = [
            { name: "refreshToken", type: sql.VarChar(255), value: refreshToken }
        ];

        try {
            var records = await db._executeQuery(`SELECT Token FROM RefreshTokens WHERE Token=@refreshToken`, inputFields);
            resolve(records.length > 0);
        } catch (err) {
            resolve(false);
        }
    });
}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                console.log("error verifying jwt");
                console.log(err);
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    } else {
        console.log("No auth header");
        res.sendStatus(401);
    }
};

module.exports = {
    addRefreshToken,
    removeRefreshToken,
    refreshTokenExists,
    authenticateJWT,
    accessTokenSecret,
    refreshTokenSecret
};