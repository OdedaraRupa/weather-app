 const API_KEY = import.meta.env.REACT_APP_API_URL;
console.log("✅ OpenWeather API KEY:", API_KEY); 
export const fetchWeatherByCoords = async (lat, lon) => {
    // const baseUrl = 'https://api.openweathermap.org/data/3.0/onecall';
    // const url = `${baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    // const response = await fetch(url);
    // if (!response.ok) {
    //   throw new Error('Failed to fetch weather data');
    // }

    // return response.json();
};