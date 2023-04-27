import './App.css';
import React, { useState } from "react"
import axios from "axios"


function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5318ceaec2de791db1af8b804883bc91`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((res) => {
        setData(res.data)
      })
      setLocation('')
    }
  }

  return (
    <div className="App">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='Enter Location'
          type="text" />
      </div>

      <div className='container'>
        <div className='top'>
          <p>{data.name}</p>
        </div>

        <div className='temp'>
          {data.main ? <h1>{data.main.temp.toFixed()} °C</h1> : null}
        </div>

        <div className='desc'>
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>

        {data.name !== undefined &&
          <div className='bottom'>
            <div className='feel'>
              <h6>Feels Like</h6>
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()} °C</p> : null}
            </div>

            <div className='humidity'>
              <h6>Humidity</h6>
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
            </div>

            <div className='wind'>
              <h6>Wind Speed</h6>
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} KMH</p> : null}
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default App;
