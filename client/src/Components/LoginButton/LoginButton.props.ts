import { IUser } from "../../Store/models";

export interface ILoginButtonProps {
  onLogin: (user?: IUser, accessToken?: string, refreshToken?: string) => void;
}

export enum LoginFailure {
  NONE = 0,
  INVALID_ACCOUNT = 1,
  UNKNOWN = 2
}

export interface ILoginButtonState {
  show: boolean;
  failureState: LoginFailure;
}
