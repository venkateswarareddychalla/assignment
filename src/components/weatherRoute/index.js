import React from "react";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { WiCloudyWindy } from "react-icons/wi";
import { TbStackPush } from "react-icons/tb";
import { CgCodeClimate } from "react-icons/cg";
import Loader from "react-loader-spinner";
import { MdOutlineLocationOff } from "react-icons/md";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";

const appid = "8441bff1d6bf6f115a1266d8eeeb77df";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

function Weather() {
  const [searchInput, setSearchInput] = useState("");
  const [weatherDetails, setWeatherDetails] = useState({});
  const [weatherShown, setWeatherShown] = useState(true);
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial);

  const toDate = () => {
    const months = [
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
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
      months[currentDate.getMonth()]
    }`;
    return date;
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();
    setApiStatus(apiStatusConstants.inProgress);
    setWeatherShown(false);
    setSearchInput("");
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${appid}`;
    const response = await fetch(url);
    if (response.ok) {
      const fetchedData = await response.json();
      console.log(fetchedData);
      const { weather, wind, main, name, sys } = fetchedData;
      const updatedWeatherDetails = {
        ...weather[0],
        ...wind,
        ...main,
        name,
        ...sys,
      };
      console.log(updatedWeatherDetails);
      setWeatherDetails(updatedWeatherDetails);
      setApiStatus(apiStatusConstants.success);
    } else {
      setApiStatus(apiStatusConstants.failure);
    }
  };

  const renderSuccessView = () => {
    return (
      <div className="description-container">
        <div className="city-date-container">
          <h2 className="city-heading">
            {weatherDetails.name}, <span>{weatherDetails.country}</span>
          </h2>
          <span className="date">{toDate()}</span>
        </div>
        <div className="image-temperature-container">
          <img
            className="image"
            src={`https://openweathermap.org/img/wn/${weatherDetails.icon}@2x.png`}
            alt={weatherDetails.description}
          />
          <div className="temperature-description-container">
            <div>
              <p className="temperature">
                {Math.round(weatherDetails.temp) - 273}
                <sup className="degree">&deg;C</sup>
              </p>
            </div>
            <p className="description-para">{weatherDetails.description}</p>
          </div>
        </div>
        <ul className="bottom-ul-container">
          <li key="weather" className="list-item">
            <CgCodeClimate
              className="upto-medium-icon"
              height={30}
              width={30}
              size={50}
            />
            <CgCodeClimate
              className="from-large-icon"
              height={80}
              width={80}
              size={80}
            />
            <div className="heading-para-container">
              <h1 className="list-heading">Weather</h1>
              <p className="list-para">{weatherDetails.main}</p>
            </div>
          </li>
          <li key="humidity" className="list-item">
            <WiHumidity
              className="upto-medium-icon"
              height={30}
              width={30}
              size={60}
            />
            <WiHumidity
              className="from-large-icon"
              height={80}
              width={80}
              size={80}
            />
            <div className="heading-para-container">
              <h1 className="list-heading">HUMIDITY</h1>
              <p className="list-para">{weatherDetails.humidity} mm</p>
            </div>
          </li>
          <li key="wind" className="list-item">
            <WiCloudyWindy
              className="upto-medium-icon"
              height={30}
              width={30}
              size={60}
            />
            <WiCloudyWindy
              className="from-large-icon"
              height={80}
              width={80}
              size={80}
            />
            <div className="heading-para-container">
              <h1 className="list-heading">WIND</h1>
              <p className="list-para">{weatherDetails.speed} mph</p>
            </div>
          </li>
          <li key="pressure" className="list-item">
            <TbStackPush
              className="upto-medium-icon"
              height={30}
              width={30}
              size={60}
            />
            <TbStackPush
              className="from-large-icon"
              height={80}
              width={80}
              size={80}
            />
            <div className="heading-para-container">
              <h1 className="list-heading">PRESSURE</h1>
              <p className="list-para">{weatherDetails.pressure} mb</p>
            </div>
          </li>
        </ul>
      </div>
    );
  };

  const renderFailureView = () => {
    return (
      <div className="failure-container">
        <MdOutlineLocationOff size={100} />
        <h1 className="failure-heading">Sorry, City Not Found!</h1>
        <p className="failure-para">
          The city name you provided does not match any known locations.
          Double-check the name or choose another city.
        </p>
      </div>
    );
  };

  const renderLoaderView = () => {
    return (
      <div className="loader-container">
        <Loader type="ThreeDots" size={30} color="white" />
      </div>
    );
  };

  const renderSuccessOrFailureOrLoaderView = () => {
    switch (apiStatus) {
      case apiStatusConstants.success:
        return renderSuccessView();
      case apiStatusConstants.failure:
        return renderFailureView();
      case apiStatusConstants.inProgress:
        return renderLoaderView();
      default:
        return null;
    }
  };

  return (
    <div className="main-bg-container">
      <div className="header-container">
        <h1 className="heading">Weather App</h1>
        <img
          src="https://ik.imagekit.io/0e6zfqnlk/logo.jpg?updatedAt=1724563231692"
          alt="weather-logo"
          className="weather-logo"
        />
      </div>
      <form onSubmit={onSubmitForm} className="form-element">
        <div className="input-icon-container">
          <input
            type="text"
            className="search-input"
            placeholder="Enter City Full Name..."
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />

          <button className="weather-button" type="submit">
            <FaSearch size={25} />
          </button>
        </div>
      </form>
      {weatherShown && (
        <div className="initial-container">
          <img
            src="https://ik.imagekit.io/0e6zfqnlk/weather-new_S-M5HuHtx?updatedAt=1724562430417"
            alt="weather"
            className="initial-weather-image"
          />
          <p className="initial-paragraph">
            The weather is always a good topic of conversation, because everyone
            has an opinion about it.
          </p>
          <h1 className="initial-heading">Don't Await, Let's Search!</h1>
        </div>
      )}
      {renderSuccessOrFailureOrLoaderView()}
    </div>
  );
}

export default Weather;
