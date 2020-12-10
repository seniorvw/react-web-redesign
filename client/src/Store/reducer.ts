import jwt from "jwt-decode";

import { LOGIN, SET_PROFILE, SET_ACCESS_TOKEN, SET_CHAT_AUTHOR_COLOR } from "./actions";
import { ISiteState } from "./state";
import { IUser } from "./models";

function siteReducer(state: ISiteState = {}, action: any) {
  switch (action.type) {
    case LOGIN:
      return Object.assign({}, state,
        {
          accessToken: action.accessToken,
          refreshToken: action.refreshToken,
          user: action.user
        });
    case SET_PROFILE:
      return Object.assign({}, state,
        {
          user: action.user
        });
    case SET_ACCESS_TOKEN:
      const user = jwt(action.accessToken) as IUser;
      return Object.assign({}, state,
        {
          accessToken: action.accessToken,
          user
        });
    case SET_CHAT_AUTHOR_COLOR:
      return Object.assign({}, state,
        {
          chatAuthorColors: action.chatAuthorColors
        });
    default:
      return state;
  }
}

export default siteReducer;
