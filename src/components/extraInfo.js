import React from "react";
import WeatherParameter from "./weatherParameter";
import moment from "moment-timezone";
const ExtraInfo = ({ weatherData, currentWindDirection }) => {
  const MoreInfo = () => {
    return (
      <div className="extrainfo">
        <div style={{ color: "white", lineHeight: "25px" }}>UV</div>
        <div
          className={`${
            Math.round(weatherData.current.uvi) > 5
              ? "dangerbadge "
              : Math.round(weatherData.current.uvi) < 5 &&
                Math.round(weatherData.current.uvi) > 2
              ? "moderatebadge"
              : "badge"
          }`}>
          {Math.round(weatherData.current.uvi)}
        </div>
        <div
          style={{
            marginLeft: "20px",
            lineHeight: "25px",
            color: "white",
            fontWeight: "bold",
          }}>
          {`${
            Math.round(weatherData.current.uvi) > 5
              ? "Dangerous"
              : Math.round(weatherData.current.uvi) < 5 &&
                Math.round(weatherData.current.uvi) > 2
              ? "Bad"
              : "Good"
          }`}
        </div>
      </div>
    );
  };

  const riseSetTime = (setTime, riseTime) => {
    let timeOffset =
      weatherData.timezone_offset > 0
        ? -weatherData.timezone_offset
        : weatherData.timezone_offset;
    let utcOffSet = moment().tz(weatherData.timezone).utcOffset();
    let set = new Date(setTime * 1000 - timeOffset * 1000 + utcOffSet * 60000);
    let rise = new Date(
      riseTime * 1000 - timeOffset * 1000 + utcOffSet * 60000
    );
    let setUnit = set.getHours() >= 12 ? "PM" : "AM";
    let riseUnit = rise.getHours() >= 12 ? "PM" : "AM";
    let setHours =
      set.getHours() > 12
        ? set.getHours() - 12 < 10
          ? "0" + (set.getHours() - 12)
          : set.getHours() - 12
        : set.getHours() < 10
        ? "0" + set.getHours()
        : set.getHours();
    let setMinutes =
      set.getMinutes() < 10 ? "0" + set.getMinutes() : set.getMinutes();
    let riseHours =
      rise.getHours() > 12
        ? rise.getHours() - 12 < 10
          ? "0" + (rise.getHours() - 12)
          : rise.getHours() - 12
        : rise.getHours() < 10
        ? "0" + rise.getHours()
        : rise.getHours();
    let riseMinutes =
      rise.getMinutes() < 10 ? "0" + rise.getMinutes() : rise.getMinutes();
    let result = {
      setUnit: setUnit,
      riseUnit: riseUnit,
      riseHours: riseHours,
      riseMinutes: riseMinutes,
      setHours: setHours,
      setMinutes: setMinutes,
    };
    return result;
  };

  let time = riseSetTime(
    weatherData.current.sunset,
    weatherData.current.sunrise
  );

  return (
    <div className="todayinfo">
      <div className="todaytemp">
        <WeatherParameter
          value={Math.round((weatherData.current.wind_speed * 18) / 5)}
          label={"Wind"}
          isUnit={true}
          currentWindDirection={currentWindDirection(
            weatherData.current.wind_deg
          )}
        />

        <WeatherParameter
          value={weatherData.current.humidity}
          label={"Humidity"}
          units={"%"}
        />

        <WeatherParameter
          value={weatherData.current.visibility / 1000}
          label={"Visibility"}
          units={"km"}
        />
        <WeatherParameter
          value={`${time.riseHours}:${time.riseMinutes}`}
          label={"Sunrise"}
          units={time.riseUnit}
        />
        <WeatherParameter
          value={
            weatherData.current?.wind_gust
              ? Math.round((weatherData.current.wind_gust * 18) / 5)
              : Math.round(weatherData.current.dew_point) + "°"
          }
          units={weatherData.current?.wind_gust ? "km/h" : ""}
          label={weatherData.current?.wind_gust ? "Wind Gust" : "Dew Point"}
        />
        <WeatherParameter
          value={(weatherData.current.pressure * 0.1).toFixed(1)}
          units={"kPa"}
          label={"Pressure"}
        />

        <WeatherParameter
          value={weatherData.current.clouds}
          units={"%"}
          label={"Clouds"}
        />
        <WeatherParameter
          value={`${time.setHours}:${time.setMinutes}`}
          units={time.setUnit}
          label={"Sunset"}
        />
      </div>

      <MoreInfo />
    </div>
  );
};

export default ExtraInfo;
