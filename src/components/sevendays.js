import "../css/sevenday.css";
import React, { useState, useContext } from "react";
import ExtraInfo from "./extraInfo";
import TopBar from "./topbar";
import WeatherDataContext from "../contexts/WeatherDataContext";
import NextSevenDays from "./nextSevenDay";
import CityContext from "../contexts/CityContext";

import Nav from "./nav";
const SevenDayReport = () => {
  const { city } = useContext(CityContext);
  const { weatherData } = useContext(WeatherDataContext);
  const [dayTime, setDay] = useState(true);

  const currentWindDirection = (wind_deg) => {
    if (wind_deg === 0) {
      return "N";
    } else if (wind_deg > 0 && wind_deg < 90) {
      return "NE";
    } else if (wind_deg === 90) {
      return "E";
    } else if (wind_deg > 90 && wind_deg < 180) {
      return "SE";
    } else if (wind_deg === 180) {
      return "S";
    } else if (wind_deg > 180 && wind_deg < 270) {
      return "SW";
    } else if (wind_deg === 270) {
      return "W";
    } else if (wind_deg > 270 && wind_deg < 360) {
      return "NW";
    } else {
      return "N";
    }
  };

  const currentStory = () => {
    if (weatherData.alert && weatherData.current.weather.length > 0) {
      return (
        <div className="box">
          <div className="title">Today's Story</div>
          <div className="story">{weatherData.alert}</div>
        </div>
      );
    }
    return;
  };

  const toggle = () => {
    let change = !dayTime;
    setDay(change);
  };

  const TodayIcon = () => {
    return (
      <div className="weather">
        <div className="w">
          <div className="weatherinfo">
            <div>
              <div className="tempdigit">
                {Math.round(weatherData.current.temp)}
              </div>
            </div>

            <div className="tempinfo">
              <div className="celsuis">°C</div>
              <div className="tempfill">
                <div className="feeltitle">
                  <div>FEELS</div>
                  <div style={{ marginLeft: "10px" }}>LIKE</div>
                </div>

                <div className="tempno">
                  {Math.round(weatherData.current.feels_like)}
                </div>
              </div>
            </div>
            <div className="weatherimage">
              <img
                className="tempimage"
                src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`}
                alt=""
              />
            </div>
          </div>
          <div className="weatherKeyword">
            {weatherData.current.weather.length > 0
              ? weatherData.current.weather[0].main
              : null}
          </div>
        </div>

        <div className="weather-story">{currentStory()}</div>
      </div>
    );
  };

  const TemperaturLabels = () => {
    const arr = [
      "Feels like",
      "dayTime",
      "POP",
      "Wind (km/h)",
      "Wind gust (km/h)",
      "24 Hr Rain",
      "24 Hr Snow",
    ];

    return arr.map((label, index) => {
      return (
        <div key={index} className="unitinfo">
          {label === "Feels like" ? (
            <div id="feel">{label}</div>
          ) : (
            <div
              className={
                label === "dayTime" || label === "POP" ? "single" : ""
              }>
              {label === "dayTime" ? `${dayTime ? "Night" : "Day"}` : label}
            </div>
          )}
        </div>
      );
    });
  };

  if (weatherData.current) {
    return (
      <div className="container">
        <div className="location-container">
          <Nav />
          <TopBar city={city} />
          <TodayIcon />
          <ExtraInfo
            weatherData={weatherData}
            currentWindDirection={currentWindDirection}
          />

          <div className="sevendays">
            <div className="topbar">
              <div className="barheading">
                <span style={{ fontSize: "1.2rem", color: "#333" }}>
                  Next 7 Days
                </span>
              </div>
              <div className="togglebutton">
                <span className="sun">☀</span>
                <label className="switch">
                  <input type="checkbox" onClick={toggle} />
                  <span className="slider round"></span>
                </label>
                <span className="moon">☾</span>
              </div>
            </div>
            <div className="days">
              <NextSevenDays
                weatherData={weatherData}
                dayTime={dayTime}
                currentWindDirection={currentWindDirection}
              />
              <div className="infoheadings">
                <TemperaturLabels />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
};
export default SevenDayReport;
