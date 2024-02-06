import React, { useState, useEffect } from "react";
import apiKeys from "./apiKeys";
import Clock from "react-live-clock";
import Forcast from "./forcast";
import loader from "./images/cloudy.gif";
import ReactAnimatedWeather from "react-animated-weather";
import { useNavigate, Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
const dateBuilder = (d) => {

  
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};
const defaults = {
  color: "white",
  size: 112,
  animate: true,
};

const Weather = () =>{
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState({
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    icon: "CLOUDY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (navigator.geolocation) {
          const position = await getPosition();
          const { latitude, longitude } = position.coords;
          const data = await getWeather(latitude, longitude);
          updateWeatherData(data);
        } else {
          alert("Geolocation not available");
        }
      } catch (error) {
        // Handle error
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 600000);

    return () => clearInterval(intervalId);
  }, []);

  const getPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
    );
    return await api_call.json();
  };

  const updateWeatherData = (data) => {
    setWeatherData({
      lat: data.coord.lat,
      lon: data.coord.lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      country: data.sys.country,
      icon: getWeatherIcon(data.weather[0].main),
    });
  };

  const getWeatherIcon = (weatherMain) => {
    switch (weatherMain) {
      case "Haze":
        return "CLEAR_DAY";
      case "Clouds":
        return "CLOUDY";
      case "Rain":
        return "RAIN";
      case "Snow":
        return "SNOW";
      case "Dust":
        return "WIND";
      case "Drizzle":
        return "SLEET";
      case "Fog":
      case "Smoke":
        return "FOG";
      case "Tornado":
        return "WIND";
      default:
        return "CLEAR_DAY";
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <React.Fragment>
      {weatherData.temperatureC ? (
        <div className="city">
          <div className="title">
            <h2>{weatherData.city}</h2>
            <h3>{weatherData.country}</h3>
          </div>
          <div className="mb-icon">
            <ReactAnimatedWeather
              icon={weatherData.icon}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
            <p>{weatherData.main}</p>
          </div>
          <div className="date-time">
            <div className="dmy">
              <div id="txt"></div>
              <div className="current-date">{dateBuilder(new Date())}</div>
            </div>
            <div className="temperature">
              <p>
                {weatherData.temperatureC}°<span>C</span>
              </p>
            </div>
          </div>
          <Forcast icon={weatherData.icon} weather={weatherData.main} />
          <Link to="/useractive">Users Activity</Link>
          
          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      ) : (
        <React.Fragment>
          <img src={loader} style={{ width: "50%", WebkitUserDrag: "none" }} />
          <h3 style={{ color: "black", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "black", marginTop: "10px" }}>
            Your current location will be displayed on the App <br /> & used for
            calculating Real-time weather.
          </h3>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Weather;
