export const MismatchedPasswordsErrorString = "Mismatched Passwords";
export const MalformedPasswordErrorString = "Malformed Password";
export const MalformedEmailErrorString = "Malformed Email";
export const DuplicateAccountErrorString = "Duplicate Account";
export const IncorrectPasswordsErrorString = "Incorrect Password";
export const MissingPasswordErrorString = "Missing Password";
export const UnkownErrorString = "Unkown Error";

export function hasLowerCase(str: string) {
    return (/[a-z]/.test(str));
}

export function hasUpperCase(str: string) {
    return (/[A-Z]/.test(str));
}

export function hasNumber(str: string) {
    return (/\d/.test(str));
}

export function hasSpecialChar(str: string) {
    console.log(`testing ${str} for special chars`);
    return (/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g.test(str));
}

export function checkPasswordRequirements(password: string) {
    return (
        hasLowerCase(password) &&
        hasUpperCase(password) &&
        hasNumber(password) &&
        hasSpecialChar(password)
    );
}

export function checkEmailRequirements(email: string) {
    return email.indexOf("@") !== -1 || email.indexOf("@") !== email.length - 1;
}
