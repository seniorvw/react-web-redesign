import { IChannel, IVideo } from "../../Store/models";

export enum VideoPreviewSize {
  SMALL = 0,
  LARGE = 1
}

export interface IVideoPreviewProps {
  video: IVideo;
  size: VideoPreviewSize;
}
