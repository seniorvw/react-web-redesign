import { IChatMessage, IUser, IChatAuthorColor } from "../../Store/models";

export interface IChatRoomProps {
    roomId: string;
    width: number;

    user?: IUser;
    chatColors?: IChatAuthorColor[];

    updateChatAuthorColor: (chatColors: IChatAuthorColor[]) => void;
}

export interface IChatRoomState {
    error: boolean;
    messages: IChatMessage[];
    promptUserForHandle: boolean;
    showSpinner: boolean;

    chatHandle?: string;
}
