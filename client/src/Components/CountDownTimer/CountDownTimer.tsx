import React from "react";
import moment from "moment-timezone";

import { ICountDownTimerProps, ICountDownTimerState } from "./CountDownTimer.props";

import * as Styles from "../../Util/Styles";

class CountdownTimer extends React.Component<ICountDownTimerProps, ICountDownTimerState> {
  interval: NodeJS.Timeout | undefined;

  constructor(props: ICountDownTimerProps) {
    super(props);

    this.state = {
      days: undefined,
      hours: undefined,
      minutes: undefined,
      months: undefined,
      seconds: undefined
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const { timeTillDate } = this.props;
      const then = moment.tz(timeTillDate, "America/New_York");
      const now = moment();
      // @ts-ignore
      const countdown = moment(then - now);
      let months = countdown.format("MM");
      const days = countdown.format("D");
      const hours = countdown.format("HH");
      const minutes = countdown.format("mm");
      const seconds = countdown.format("ss");

      if (parseInt(months, 10) > 0) {
        months = "1";
      }

      this.setState({ days, hours, minutes, months, seconds });
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  render() {
    const { days, hours, minutes, months, seconds } = this.state;

    // Mapping the date values to radius values
    const monthsRadius = mapNumber(months, 12, 0, 0, 360);
    const daysRadius = mapNumber(days, 30, 0, 0, 360);
    const hoursRadius = mapNumber(hours, 24, 0, 0, 360);
    const minutesRadius = mapNumber(minutes, 60, 0, 0, 360);
    const secondsRadius = mapNumber(seconds, 60, 0, 0, 360);

    const itemStyle = {
      alignItems: "center",
      color: Styles.Colors.green,
      display: "flex",
      flexDirection: "column",
      fontSize: "40px",
      height: "100px",
      justifyContent: "center",
      lineHeight: "30px",
      margin: "10px",
      paddingTop: "10px",
      position: "relative",
      width: "100px",
    };

    if (!seconds) {
      return null;
    }

    const daysString = days && days === "1" ? "day" : "days";
    const hoursString = hours && hours === "1" ? "hour" : "hours";
    const minutesString = minutes && minutes === "1" ? "minute" : "minutes";
    const secondsString = seconds && seconds === "1" ? "second" : "seconds";

    return (
      <div style={{ padding: "16px" }}>
        <div style={{ textAlign: "center", height: "100px", padding: "16px", width: "100%" }}>
          <span style={{ fontSize: "xxx-large", color: Styles.Colors.green }}>
            Countdown to Launch!
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          {months && months !== "0" && (
            // @ts-ignore
            <div style={itemStyle}>
              <SVGCircle radius={monthsRadius} />
              {months}
              <span style={{
                color: Styles.Colors.red,
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}>month</span>
            </div>
          )}
          {days && (
            // @ts-ignore
            <div style={itemStyle}>
              <SVGCircle radius={daysRadius} />
              {days}
              <span style={{
                color: Styles.Colors.red,
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}>{daysString}</span>
            </div>
          )}
          {hours && (
            // @ts-ignore
            <div style={itemStyle}>
              <SVGCircle radius={hoursRadius} />
              {hours}
              <span style={{
                color: Styles.Colors.red,
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}>{hoursString}</span>
            </div>
          )}
          {minutes && (
            // @ts-ignore
            <div style={itemStyle}>
              <SVGCircle radius={minutesRadius} />
              {minutes}
              <span style={{
                color: Styles.Colors.red,
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}>{minutesString}</span>
            </div>
          )}
          {seconds && (
            // @ts-ignore
            <div style={itemStyle}>
              <SVGCircle radius={secondsRadius} />
              {seconds}
              <span style={{
                color: Styles.Colors.red,
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
              }}>{secondsString}</span>
            </div>
          )}
        </div>
      </div>
    );
  }
}

// @ts-ignore
const SVGCircle = ({ radius }) => (
  <svg style={{
    height: "100px",
    left: "0",
    position: "absolute",
    top: "0",
    width: "100px",
  }}>
    <path
      fill="none"
      stroke={Styles.Colors.green}
      stroke-width="4"
      d={describeArc(50, 50, 48, 0, radius)}
    />
  </svg>
);

// @ts-ignore
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians)
  };
}

// @ts-ignore
function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

  const d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y
  ].join(" ");

  return d;
}

// @ts-ignore
function mapNumber(num, inMin, inMax, outMin, outMax) {
  return (
    ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
  );
}

export default CountdownTimer;
