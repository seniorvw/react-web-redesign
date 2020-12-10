import { IChatMessage } from "src/Store/models";

export interface IChatRoomMessageProps {
    authorColor: string;
    message: IChatMessage;
    width: number;
}
