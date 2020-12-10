import { IUser } from "../../Store/models";

export interface IStreamDetailsSectionProps {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IStreamDetailsSectionState {
    failure: boolean;
    showNotifyStreamersSpinner: boolean;
}
