import { IUser, IChatAuthorColor } from "./models";

export interface ISiteState {
    user?: IUser;
    accessToken?: string;
    refreshToken?: string;

    chatAuthorColors?: IChatAuthorColor[];
}
