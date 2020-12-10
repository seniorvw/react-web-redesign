import { IUser } from "../../Store/models";

export interface IRegistrationButtonProps {
  onSignUp: (user?: IUser, accessToken?: string, refreshToken?: string) => void;
}

export enum RegistrationFailure {
  NONE = 0,
  MALFORMED_EMAIL = 1,
  MISMATCHED_PASSWORDS = 2,
  MALFORMED_PASSWORD = 3,
  DUPLICATE_ACCOUNT = 4,
  UNKNOWN = 5
}

export interface IRegistrationButtonState {
  show: boolean;
  failureState: RegistrationFailure;
}
