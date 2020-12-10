import { IChannel } from "../../Store/models";

export interface IRecommendedChannelsPanelState {
    liveChannels: IChannel[];
    featuredChannels: IChannel[];
}
