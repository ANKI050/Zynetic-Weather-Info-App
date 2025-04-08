import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import RecentSearches from './components/RecentSearches';
import Forecast from './components/Forecast';
import Loader from './components/Loader';
import './App.css';
import { FiMenu } from 'react-icons/fi'; 

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

  const fetchWeatherData = useCallback(async (city) => {
    setLoading(true);
    setError(null);
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      
      if (!weatherResponse.ok) throw new Error('City not found');
      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
      
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastData = await forecastResponse.json();
      setForecastData(forecastData);
      
      setRecentSearches(prev => {
        const newSearches = [city, ...prev.filter(item => item !== city)];
        return newSearches.slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  }, [API_KEY]);

  useEffect(() => {
    fetchWeatherData('Delhi');
  }, [fetchWeatherData]);

  const handleRefresh = () => {
    if (weatherData?.name) {
      fetchWeatherData(weatherData.name);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      {/* Hamburger Button */}
      <button className="hamburger-btn" onClick={toggleSidebar}>
      <FiMenu size={24} />
      </button>

      <RecentSearches 
        searches={recentSearches} 
        onSearch={fetchWeatherData}
        isOpen={sidebarOpen}
     />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? '☀️' : '🌙'}
        </div>
        
        <h1 className="app-title">Weather Dashboard</h1>
        
        <SearchBar 
          onSearch={fetchWeatherData} 
          onRefresh={handleRefresh}
          currentCity={weatherData?.name}
        />
        
        {loading ? <Loader /> : null}
        
        {error && <div className="error">{error}</div>}
        
        {weatherData && !loading && (
          <>
            <WeatherCard data={weatherData} />
            {forecastData && <Forecast data={forecastData} />}
          </>
        )}
      </div>
    </div>
  );
}

export default App;