import React from 'react';

const WeatherCard = ({ data }) => {
  const weatherIcon = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

  return (
    <div className="weather-card">
      <h2>{data.name}, {data.sys.country}</h2>
      <div className="weather-main">
        <img src={iconUrl} alt={data.weather[0].description} />
        <div className="weather-temp">{Math.round(data.main.temp)}°C</div>
      </div>
      <div className="weather-description">{data.weather[0].main}</div>
      
      <div className="weather-details">
        <div className="detail-item">
          <span>Humidity</span>
          <span>{data.main.humidity}%</span>
        </div>
        <div className="detail-item">
          <span>Wind Speed</span>
          <span>{data.wind.speed} km/h</span>
        </div>
        <div className="detail-item">
          <span>Feels Like</span>
          <span>{Math.round(data.main.feels_like)}°C</span>
        </div>
        <div className="detail-item">
          <span>Pressure</span>
          <span>{data.main.pressure} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;