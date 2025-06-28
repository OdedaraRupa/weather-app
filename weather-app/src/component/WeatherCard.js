import React from "react";
import sun from "../Images/sun.png";
import ForecastList from "./ForecastList";
import { FaPlus } from "react-icons/fa";
import cloud from "../Images/cloudy.png";
import rain from "../Images/rainy.png";
import snow from "../Images/snow.svg";
import moon from "../Images/moon.png";
const WeatherCard = ({ weatherData, forecast, onAddToList }) => {
  const weatherMain = weatherData?.weather?.[0]?.main?.toLowerCase() || "";
const icon = weatherData?.weather?.[0]?.icon || "";
const isDay = icon.includes("d");

  let weatherImage = sun;
  let weatherClass = "card-sunny";

  if (weatherMain.includes("cloud")) {
    weatherImage = cloud;
    weatherClass = "card-cloudy";
  } else if (weatherMain.includes("rain") || weatherMain.includes("drizzle")) {
    weatherImage = rain;
    weatherClass = "card-rainy";
  } else if (weatherMain.includes("snow")) {
    weatherImage = snow;
    weatherClass = "card-snowy";
  } else if (!isDay) {
    weatherImage = moon;
    weatherClass = "card-night";
  }
  return (
    <>
      <div className="layout-container">
        {weatherData && weatherData.main && weatherData.weather && (
          <div
            className={`layout-col-6 h-400 weather-card  ${weatherClass}`}
          >
            <div className="button-container ">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Clicked");
                  onAddToList(weatherData);
                }}
                className="btn btn-add"
              >
                <FaPlus size={15} color="#2D2D2D" /> Add to Weather List
              </button>
            </div>
            <div className="card-top">
              <div className="card-image">
                <img alt="weather-image" src={weatherImage}></img>
              </div>

              <div className="location">
                <p>{weatherMain}</p>
                <h2 className="temprature">{weatherData.main.temp}°F</h2>
                <p>
                  {weatherData.name}, {weatherData.sys.country}
                </p>
              </div>
            </div>
            <div className="card-bottom">
              <div className="weather-info">
                <div>Wind</div>
                <div> {Math.round(weatherData.wind.speed)}mph</div>
              </div>
              <div className="weather-info">
                <div>Humidity</div>
                <div> {Math.round(weatherData.main.humidity)}%</div>
              </div>
              <div className="weather-info">
                <div>Pressure</div>
                <div>{weatherData.main.pressure}in</div>
              </div>
              <div className="weather-info">
                <div>Feels like:</div>
                <div> {Math.round(weatherData.main.feels_like)}°C</div>
              </div>
            </div>
          </div>
        )}
        <ForecastList forecast={forecast}> </ForecastList>
      </div>
    </>
  );
};

export default WeatherCard;
