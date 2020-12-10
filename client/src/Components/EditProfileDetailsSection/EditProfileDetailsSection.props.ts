import { IUser } from "../../Store/models";

export enum UpdateFailure {
    NONE = 0,
    MALFORMED_EMAIL = 1,
    MISMATCHED_PASSWORDS = 2,
    MALFORMED_PASSWORD = 3,
    INCORRECT_PASSWORD = 4,
    MISSING_PASSWORD = 5,
    DUPLICATE_ACCOUNT = 6,
    UNKNOWN = 7
}

export interface IEditProfileDetailsSectionProps {
    accessToken: string;
    refreshToken: string;
    user: IUser;
    updateProfile: (user: IUser) => void;
}

export interface IEditProfileDetailsSectionState {
    failureState: UpdateFailure;
    showUpdateProfileSpinner: boolean;
    showDeleteAccountSpinner: boolean;
    showDeleteAccountModal: boolean;
}
