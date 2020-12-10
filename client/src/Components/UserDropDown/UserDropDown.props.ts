import { IUser } from "../../Store/models";

export interface IUserDropDownProps {
    user: IUser;
    refreshToken: string;
    onLogout: (user?: IUser) => void;
}
