import { IChannel, IStoredVideo, IVideo } from "../../Store/models";
import { VideoPreviewSize } from "../VideoPreview/VideoPreview.props";

export interface IVideoListProps {
  title: string;
  backgroundColor: string;
  videos?: IVideo[];
  size: VideoPreviewSize;
  comingSoon?: boolean;

  // TODO remove this when we launch
  showGif?: boolean;
}
