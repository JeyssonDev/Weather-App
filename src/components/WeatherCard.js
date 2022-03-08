import axios from 'axios'
import React, { useEffect, useState } from 'react'

const WeatherCard = () => {

    const [weather, setWeather] = useState({});
    const [degree, setDegree] = useState(weather.main?.temp.toFixed())
    const [isCe, setIsCe] = useState(true);

    const success = pos =>{
        const latitude = pos.coords.latitude;
        const longitude = pos.coords.longitude;

        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=6b283fb59c5aebf2aa0892446d00e455`)
            .then(res => {
                setWeather(res.data)
                setDegree(res.data?.main?.temp.toFixed())
            });
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success);
    }, [])

    const convertDegree = () => {
        if(isCe){
            setDegree((degree * 9/5 + 32).toFixed(0));
            setIsCe(false);
        } else {
            setDegree(((degree-32) * 5/9).toFixed(0));
            setIsCe(true);
        }
    }       

  return (
      
    <div>
        <h1>Weather App</h1>
        <div className='cardWeather'>
        
        <div className="container">
            <div className="top">
                <div className="location">
                    <p>{weather.name}, {weather.sys?.country}</p>
                </div>
                 <img 
                    src={weather?.weather?.[0].icon ? `http://openweathermap.org/img/wn/${weather?.weather?.[0].icon}@2x.png` : ""}
                    alt="Clima"
                  />
                <div className="temp">
                    <h2>{degree} {isCe ? 'ºC' : 'ºF'}</h2>
                </div>

                <button onClick={convertDegree} className='ChangeValue'>{isCe ? 'Degrees ºC/ºF' : 'Degrees ºF/ºC'}</button>

                <div className="description">
                    {weather.weather ? <p>{weather.weather[0].main}</p> : null}
                </div>
            </div>

            <div className="bottom">
                <div className="feels">
                    {weather.main ? <p className='bold'>{weather.main.feels_like.toFixed()}°C</p> : null}
                    <p>Feels Like</p>
                </div>
                <div className="humidity">
                <i className="fa-solid fa-droplet"></i> {weather.main ? <p className='bold'>{weather.main.humidity}%</p> : null}
                    <p>Humidity</p>
                </div>
                <div className="wind">
                <i className="fa-solid fa-wind"></i> {weather.wind ? <p className='bold'>{weather.wind.speed.toFixed()} MPH</p> : null}
                    <p>Wind Speed</p>
                </div>
            </div>
             
        </div>
        </div>
    </div>
    
  )
}

export default WeatherCard