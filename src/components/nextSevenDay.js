import React from "react";
import moment from "moment-timezone";
const NextSevenDays = ({ weatherData, dayTime, currentWindDirection }) => {
  if (weatherData.daily.length > 0) {
    const Day = ({ date }) => {
      return (
        <div
          style={{
            color: !dayTime ? "white" : "black",
            background: dayTime
              ? moment(date).format("dddd") === "Saturday" ||
                moment(date).format("dddd") === "Sunday"
                ? "#F3F3F3"
                : "#FAFAFA"
              : moment(date).format("dddd") === "Saturday" ||
                moment(date).format("dddd") === "Sunday"
              ? "#72879C"
              : "#8FA1B1",
          }}
          className="day">
          <div style={{ color: !dayTime ? "white" : "black" }}>
            {" "}
            <span>{moment(date).format("ddd")}</span>
          </div>
          <div style={{ color: !dayTime ? "white" : "black" }} className="date">
            {" "}
            <span>{moment(date).format("M/D")}</span>{" "}
          </div>
        </div>
      );
    };

    const DayInfo = ({ date, day }) => {
      return (
        <>
          <div
            style={{
              color: !dayTime ? "white" : "black",
              background: dayTime
                ? moment(date).format("dddd") === "Saturday" ||
                  moment(date).format("dddd") === "Sunday"
                  ? "#F3F3F3"
                  : "#FAFAFA"
                : moment(date).format("dddd") === "Saturday" ||
                  moment(date).format("dddd") === "Sunday"
                ? "#72879C"
                : "#8FA1B1",
            }}
            className="daydescription">
            <div>
              {" "}
              <span>{day.weather[0].description}</span>
            </div>
          </div>
          <div
            style={{
              color: !dayTime ? "white" : "black",
              background: dayTime
                ? moment(date).format("dddd") === "Saturday" ||
                  moment(date).format("dddd") === "Sunday"
                  ? "#F3F3F3"
                  : "#FAFAFA"
                : moment(date).format("dddd") === "Saturday" ||
                  moment(date).format("dddd") === "Sunday"
                ? "#72879C"
                : "#8FA1B1",
            }}
            className="weathericon">
            <img
              className="dayweatherimage"
              src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
              alt=""
            />
          </div>
          <div
            style={{
              color: !dayTime ? "white" : "black",
              background: dayTime
                ? moment(date).format("dddd") === "Saturday" ||
                  moment(date).format("dddd") === "Sunday"
                  ? "#F3F3F3"
                  : "#FAFAFA"
                : moment(date).format("dddd") === "Saturday" ||
                  moment(date).format("dddd") === "Sunday"
                ? "#72879C"
                : "#8FA1B1",
            }}
            className="daytemperature">
            <span>{`${
              dayTime ? Math.round(day.temp.day) : Math.round(day.temp.night)
            }`}</span>
            <span className="weatherunit">°</span>
          </div>
        </>
      );
    };

    const DayTempInfo = ({
      date,
      value,
      backgroundArray1,
      backgroundArray2,
      unit,
      isUnit = true,
      isBold = false,
    }) => {
      console.log(backgroundArray1);
      console.log(backgroundArray2);
      return (
        <div
          className="daytempinfo"
          id="top"
          style={{
            color: !dayTime ? "white" : "black",
            background: dayTime
              ? moment(date).format("dddd") === "Saturday" ||
                moment(date).format("dddd") === "Sunday"
                ? backgroundArray1[0]
                : backgroundArray1[1]
              : moment(date).format("dddd") === "Saturday" ||
                moment(date).format("dddd") === "Sunday"
              ? backgroundArray2[0]
              : backgroundArray2[1],
          }}>
          <span
            style={{ fontWeight: isBold && value !== "-" ? "bold" : "" }}
            className="information">
            {value}
          </span>

          {isUnit ? (
            <span style={{ fontSize: "14px", marginLeft: "5px" }}>{unit}</span>
          ) : null}
        </div>
      );
    };

    const days = weatherData.daily.map((day, index) => {
      if (index > 0) {
        let utcOffSet = moment().tz(weatherData.timezone).utcOffset();
        let date = new Date(
          day.dt * 1000 - weatherData.timezone_offset * 1000 + utcOffSet * 60000
        );
        return (
          <div key={index} className="weekday">
            <Day date={date} />
            <DayInfo date={date} day={day} />

            <div className="dayinfo">
              <DayTempInfo
                date={date}
                backgroundArray1={["#E4E4E4", "#F3F3F3"]}
                backgroundArray2={["#57718A", "#72879C"]}
                value={
                  dayTime
                    ? Math.round(day.feels_like.day) + "°"
                    : Math.round(day.feels_like.night) + "°"
                }
                isUnit={false}
              />

              <DayTempInfo
                value={`${
                  !dayTime
                    ? Math.round(day.temp.day)
                    : Math.round(day.temp.night)
                }°`}
                backgroundArray1={["#F3F3F3", "#FAFAFA"]}
                backgroundArray2={["#72879C", "#8FA1B1"]}
                isUnit={false}
              />
              <DayTempInfo
                date={date}
                backgroundArray1={["#E4E4E4", "#F3F3F3"]}
                backgroundArray2={["#57718A", "#72879C"]}
                value={Math.round(day.pop)}
                unit={"%"}
              />
              <DayTempInfo
                date={date}
                backgroundArray1={["#F3F3F3", "#FAFAFA"]}
                backgroundArray2={["#72879C", "#8FA1B1"]}
                value={Math.round((day.wind_speed * 18) / 5)}
                unit={currentWindDirection(weatherData.current.wind_deg)}
              />
              <DayTempInfo
                backgroundArray1={["#E4E4E4", "#F3F3F3"]}
                backgroundArray2={["#57718A", "#72879C"]}
                date={date}
                value={Math.round((day.wind_gust * 18) / 5)}
                isUnit={false}
              />

              <DayTempInfo
                date={date}
                backgroundArray1={["#F3F3F3", "#FAFAFA"]}
                backgroundArray2={["#72879C", "#8FA1B1"]}
                value={day.rain ? day.rain + " mm" : "-"}
                isUnit={false}
                isBold={true}
              />
              <DayTempInfo
                backgroundArray1={["#E4E4E4", "#F3F3F3"]}
                backgroundArray2={["#57718A", "#72879C"]}
                date={date}
                value={`${day.snow ? day.snow + " mm" : "-"}`}
                isUnit={false}
                isBold={true}
              />
            </div>
          </div>
        );
      }
    });

    return days;
  }
  return;
};
export default NextSevenDays;
