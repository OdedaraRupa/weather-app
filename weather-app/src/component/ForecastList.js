import React from "react";

const ForecastList = ({ forecast }) => {
  console.log(forecast);
  return (
    <>
      {forecast.length > 0 && (
        <div className="layout-col-6 weather-card card-gray">
          <div className="layout-row ">
            <h2>Weekly Forecast</h2>
          </div>
          <div className="layout-row container-shadow card-white b-radius">
            {forecast.map((day, index) => (
              <div className="layout-col-3 " key={index}>
                <img
                  src={`http://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].description}
                />
                <p>{Math.round(day.main.temp)}°F</p>
                <p>
                  {" "}
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
export default ForecastList;
