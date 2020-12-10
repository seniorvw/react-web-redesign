import { IUser } from "../../Store/models";

export interface IProfileSettingsProps {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}
