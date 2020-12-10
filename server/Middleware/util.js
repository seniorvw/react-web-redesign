function hasLowerCase(str) {
    return (/[a-z]/.test(str));
}

function hasUpperCase(str) {
    return (/[A-Z]/.test(str));
}

function hasNumber(str) {
    return (/\d/.test(str));
}

function hasSpecialChar(str) {
    return (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str));
}

function checkCharacters(password) {
    return hasLowerCase(password) &&
        hasUpperCase(password) &&
        hasNumber(password) &&
        hasSpecialChar(password);
}

function JsonFailure(res, message) {
    res.json({ success: false, message: message });
}

module.exports = {
    checkCharacters,
    JsonFailure
};