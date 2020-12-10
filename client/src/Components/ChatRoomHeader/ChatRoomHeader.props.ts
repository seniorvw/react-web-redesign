export interface IChatRoomHeaderState {
  response?: any;
  showModal: boolean;
  showSpinner: boolean;
}

export interface IChatRoomHeaderProps {
  height: number;
  channelId: string;
}
