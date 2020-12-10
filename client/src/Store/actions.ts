import { IUser, IChatAuthorColor } from "./models";

export const LOGIN = "LOGIN";
export const SET_PROFILE = "SET_PROFILE";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const SET_CHAT_AUTHOR_COLOR = "SET_CHAT_AUTHOR_COLOR";

export function setLoginState(newUser?: IUser, accessToken?: string, refreshToken?: string) {
    return {
        accessToken,
        refreshToken,
        type: LOGIN,
        user: newUser
    };
}

export function setProfile(user: IUser) {
    return {
        type: SET_PROFILE,
        user
    };
}

export function setAccessToken(accessToken: string) {
    return {
        accessToken,
        type: SET_ACCESS_TOKEN
    };
}

export function setChatAuthorColors(chatAuthorColors: IChatAuthorColor[]) {
    return {
        chatAuthorColors,
        type: SET_CHAT_AUTHOR_COLOR
    };
}
