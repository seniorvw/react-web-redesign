export interface IDuration {
  hours: number;
  minutes: number;
  seconds: number;
}

export interface IVideo {
  description: string;
  id: string;
  title: string;
  pictures: {
    thumbnail: string[],
    splashscreen: string[]
  };
}

export interface IChannel extends IVideo {
  online: boolean;
  player_height: number;
  player_width: number;
}

export interface IStoredVideo extends IVideo {
  // TODO Update to match stored video properties
  temp?: string;
}

export interface IDacastAccountInfo {
  Name: string;
  StreamUrl: string;
  StreamKey: string;
  Username: string;
  Password: string;
  ChannelId: string;
}

export const EMPTY_USER = {
  dacast_account_info: {
    ChannelId: "",
    Name: "",
    Password: "",
    StreamKey: "",
    StreamUrl: "",
    Username: "",
  },
  email: "",
  name: ""
};

export interface IUser {
  name: string;
  email: string;
  dacast_account_info: IDacastAccountInfo;
}

export interface ISearchObject {
  display_name: string;
  channel?: IChannel;
}

export interface IChatMessage {
  author: string;
  message: string;
  timestamp: string;
  roomId: string;
}

export interface IChatAuthorColor {
  author: string;
  color: string;
}
