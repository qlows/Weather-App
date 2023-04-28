import React, { useState } from "react";
import axios from "axios";
import "weather-icons/css/weather-icons.min.css";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  const apiKey = "5318ceaec2de791db1af8b804883bc91";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric`;

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(`${apiUrl}&q=${location}`);
        setData(response.data);
        setError("");
      } catch (error) {
        setError("Location not found");
      }
      setLocation("");
    }
  };

  return (
    <div className="App">
      {error ? (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      ) : null}
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <p>{data.name}</p>
        </div>

        <div className="temp">
          {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
        </div>

        <div className="desc">
          {data.weather ? (
            <i className={`wi wi-owm-${data.weather[0].id}`}></i>
          ) : null}
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feel">
              <h6>Feels Like</h6>
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()} °C</p>
              ) : null}
            </div>

            <div className="humidity">
              <h6>Humidity</h6>
              {data.main ? (
                <p className="bold">{data.main.humidity}%</p>
              ) : null}
            </div>

            <div className="wind">
              <h6>Wind Speed</h6>
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} KMH</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
