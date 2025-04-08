import React from 'react';

const Forecast = ({ data }) => {
  // Group forecast by day
  const dailyForecast = data.list.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = item;
    }
    return acc;
  }, {});

  // Convert to array and remove today
  const forecastDays = Object.entries(dailyForecast)
    .slice(1, 6)
    .map(([date, item]) => ({
      date,
      temp: Math.round(item.main.temp),
      icon: item.weather[0].icon,
      description: item.weather[0].main
    }));

  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      <div className="forecast-days">
        {forecastDays.map((day, index) => (
          <div key={index} className="forecast-day">
            <div>{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
            <img 
              src={`https://openweathermap.org/img/wn/${day.icon}.png`} 
              alt={day.description} 
            />
            <div>{day.temp}°C</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;