import { IUser } from "../../Store/models";

export interface IWebsiteHeaderProps {
    user?: IUser;
    updateLoginState: (user?: IUser) => void;
}
