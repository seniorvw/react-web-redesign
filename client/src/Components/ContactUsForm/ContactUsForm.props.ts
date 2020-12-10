export interface IContactUsFormProps {
    width?: string;
    height?: string;

    subject?: string;
    message?: string;

    isStreamerSignUp?: boolean;
}

export interface IContactUsFormState {
    showSpinner: boolean;
    showModal: boolean;
    response?: any;
}
