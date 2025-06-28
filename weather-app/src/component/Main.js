import React, { useState, useEffect } from "react";
import WeatherCard from "./WeatherCard";
import LocationSearch from "./LocationSearch";
import WeatherList from "./WeatherList";

const Main = () => {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [weatherList, setWeatherList] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setLat(lat);
        setLong(lon);
        fetchWeatherAndForecast(lat, lon);
      },
      (error) => {
        setError("📍 Please enable location permissions in your browser.");
      }
    );
  }, []);
  // Get Weather and Forecast Data
  const fetchWeatherAndForecast = async (lat, lon) => {
    try {
      const weather = await getWeather(lat, lon);
      setWeatherData(weather);

      await getForecast(lat, lon);
    } catch (err) {
      setError(err.message);
    }
  };
  const getWeather = async (lat, lon) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    );
    if (!res.ok) throw new Error("Failed to fetch current weather.");
    return res.json();
  };
  const getForecast = async (lat, lon) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}`
    );
    const forecastdata = await res.json();
    const dailyForecast = forecastdata.list.filter(
      (item, index) => index % 8 === 0
    );
    setForecast(dailyForecast);
    if (!res.ok) throw new Error(" Failed to fetch forecast.");
  };
  // Handle Search for input
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    try {
      // Step 1: Get coordinates from city name using OpenWeather's Geocoding API
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${process.env.REACT_APP_API_KEY}`
      );

      if (!geoRes.ok) throw new Error("Failed to get location from city name.");

      const geoData = await geoRes.json();
      if (geoData.length === 0) throw new Error("City not found.");

      const { lat, lon } = geoData[0];

      // Step 2: Use existing function
      fetchWeatherAndForecast(lat, lon);
      setError(null); // Clear error on successful fetch
    } catch (err) {
      setError(err.message);
    }
  };
  const handleInputChange = async (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.length < 2) {
      setSuggestions([]);
      return;
    }

    try {
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
      );
      const geoData = await geoRes.json();
      setSuggestions(geoData);
    } catch (err) {
      console.error("Suggestion fetch failed:", err);
      setSuggestions([]);
    }
  };
  const fetchSuggestion = async (cityObj) => {
    setSearchInput(`${cityObj.name}, ${cityObj.country}`);
    setSuggestions([]);
    await fetchWeatherAndForecast(cityObj.lat, cityObj.lon);
  };
  const onAddToList = (data) => {
    const existData = weatherList.some((item) => item.id === data.id);
    if (!existData) {
      setWeatherList((prev) => [...prev, data]);
    } else {
      alert("Already added to the list.");
    }
  };
  const handleWeatherListClick = (data) => {
    fetchWeatherAndForecast(data.coord.lat, data.coord.lon);
  };
  const handleDeleteFromList = (id) => {
    setWeatherList((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <>
      <div className="main">
        {error && <p className="text-red-500">{error}</p>}
        {/* Search */}
        <div className="layout-container  j-center">
          <div className="layout-col-6 search-container">
            <LocationSearch
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              handleSearch={handleSearch}
              suggestions={suggestions}
               handleInputChange={handleInputChange}
              fetchSuggestion={fetchSuggestion}
            ></LocationSearch>
          </div>
        </div>
        {/* Weather List  */}
        <div className="weather-list">
          <div className="layout-row">
            <h3>Weather List</h3>
          </div>
          <div className="single-card layout-row">
            {weatherList.map((item) => (
              <WeatherList
                key={item.id}
                data={item}
                onDelete={() => handleDeleteFromList(item.id)}
                onSelect={() => handleWeatherListClick(item)}
              />
            ))}
          </div>
        </div>
        {weatherData && (
          <>
            <WeatherCard
              weatherData={weatherData}
              forecast={forecast}
              onAddToList={onAddToList}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Main;
