import { IChannel, IStoredVideo } from "../../Store/models";

export interface IHomePageVideoPanelState {
    liveChannels?: IChannel[];
    featuredChannels?: IChannel[];
    storedVideos?: IStoredVideo[];
}
