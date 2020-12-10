export interface ICountDownTimerProps {
    timeTillDate: string;
}

export interface ICountDownTimerState {
    days: string | undefined;
    hours: string | undefined;
    minutes: string | undefined;
    months: string | undefined;
    seconds: string | undefined;
}
