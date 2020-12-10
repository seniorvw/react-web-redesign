import jwt from "jwt-decode";

import { Store } from "../Store/store";
import { setAccessToken } from "../Store/actions";

const FIVE_MIN = 300000;

export namespace Requests {
  export async function postData(url: string, data: any, useAuth: boolean) {
    let accessToken = Store.getState().accessToken;
    const refreshToken = Store.getState().refreshToken;
    if (accessToken && refreshToken && useAuth) {

      // @ts-ignore
      const expiresAt = jwt(accessToken).exp * 1000;
      const refreshThreshold = (new Date()).getTime() + FIVE_MIN;

      // If the accessToken expires in less than 5 minutes, refresh it.
      if (expiresAt < refreshThreshold) {
        // Update the accessToken using the refresh token.
        accessToken = (await refreshAccessToken(refreshToken)).accessToken;
        Store.dispatch(setAccessToken(accessToken || ""));
      }
    } else if (useAuth) {
      return { error: 401, success: false };
    }

    const response = await fetch(url, {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${accessToken}`
      },
      method: "POST"
    });
    return response.json();
  }

  export async function getData(url: string, useAuth: boolean) {
    let accessToken = Store.getState().accessToken;
    const refreshToken = Store.getState().refreshToken;
    if (accessToken && refreshToken && useAuth) {

      // @ts-ignore
      const expiresAt = jwt(accessToken).exp * 1000;
      const refreshThreshold = (new Date()).getTime() + FIVE_MIN;

      // If the accessToken expires in less than 5 minutes, refresh it.
      if (expiresAt < refreshThreshold) {
        // Update the accessToken using the refresh token.
        accessToken = (await refreshAccessToken(refreshToken)).accessToken;
        Store.dispatch(setAccessToken(accessToken || ""));
      }
    } else if (useAuth) {
      return { error: 401, success: false };
    }

    const response = await fetch(url, {
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      method: "GET"
    });
    return response.json();
  }


  async function refreshAccessToken(refreshToken: string) {
    const response = await fetch("/api/v1/auth/token",
      {
        body: JSON.stringify({ token: refreshToken }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST"
      });
    return response.json();
  }
}
