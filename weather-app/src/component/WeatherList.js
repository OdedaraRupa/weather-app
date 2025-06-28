import React from "react";
import { FaTrash } from "react-icons/fa";
import cloud from "../Images/cloudy.png";
import rain from "../Images/rainy.png";
import sun from "../Images/sun.png";
import snow from "../Images/snow.svg";
import moon from "../Images/moon.png";
const WeatherList = ({ data, onSelect, onDelete }) => {
  const weatherMain = data.weather[0].main.toLowerCase(); // e.g., "rain", "clear", "snow"
  const icon = data.weather[0].icon; // e.g., "01d", "10n"
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
      <div
        className={`single-card layout-col-2 ${weatherClass} container-shadow`}
        onClick={onSelect}
      >
        <button
          className="delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <FaTrash size={15} color="#2D2D2D" />
        </button>
          <img src={weatherImage}></img>
        <h3>{data.name}</h3>
        <p>{Math.round(data.main.temp - 273.15)}°</p>
      </div>
    </>
  );
};

export default WeatherList;
