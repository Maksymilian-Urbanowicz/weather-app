import { useCookies } from "react-cookie";
import "../App.css";
import "../styles/WeatherForcast-style.css";
import "../styles/WeatherForcast-bg.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../layout/layout";
import WeatherAPIConf from "../scripts/WeatherAPIConf";
import iconThunderstorm from "../img/weather-icons/thunderstorm.png";
import iconDizzle from "../img/weather-icons/drizzle.png";
import iconRain from "../img/weather-icons/rain.png";
import iconIce from "../img/weather-icons/ice.png";
import iconUnknown from "../img/weather-icons/unknown.png";
import iconFog from "../img/weather-icons/fog.png";
import iconSun from "../img/weather-icons/sun.png";
import iconCloud from "../img/weather-icons/cloud.png";

function WeatherForcast(props) {
  const [temperature, setTemperature] = useState(null);
  const [status, setStatus] = useState(null);
  const [allWeather, setAllWeather] = useState("");
  const [cookies] = useCookies(["cityName", "units"]);
  const [option, setOption] = useState(false);
  const [delayed, setDelayed] = useState(true); // Dodana zmienna flagowa

  const city = props.data.cityName || cookies.cityName || "Gdańsk";
  let units = props.data.units || cookies.units || false;

  if (typeof units == "string") {
    units = units == "true" ? true : false;
  }

  WeatherAPIConf.API_FORMAT = "forecast";
  WeatherAPIConf.API_CITY = city;
  WeatherAPIConf.API_UNITS =
    Boolean(units) === false ? "&units=metric" : "&units=imperial";

  let tempUnit = units === false ? "°C" : "°F";
  let dateCurrent = new Date();

  useEffect(() => {
    const API_URL =
      WeatherAPIConf.API_LINK +
      WeatherAPIConf.API_FORMAT +
      WeatherAPIConf.API_CITYQ +
      WeatherAPIConf.API_CITY +
      WeatherAPIConf.API_UNITS +
      WeatherAPIConf.API_KEY;

    let tabWeek = [];

    axios
      .get(API_URL)
      .then((res) => {
        for (let i = 0; i < 40; i++) {
          let date = res.data.list[i].dt_txt;
          let [datePart, timePart] = date.split(" ");
          let temperature = res.data.list[i].main["temp"];
          let pressure = res.data.list[i].main["pressure"];
          let humidity = res.data.list[i].main["humidity"];
          let status = res.data.list[i].weather[0]["id"];
          tabWeek.push([
            datePart,
            timePart,
            temperature,
            pressure,
            humidity,
            status,
          ]);
        }

        setTemperature(Math.round(tabWeek[0][2]));
        setStatus(tabWeek[0][5]);
        const jsonAll = JSON.stringify(tabWeek);
        setAllWeather(jsonAll);
        setDelayed(false);
      })
      .catch((error) => {
        //console.error("Błąd pobierania prognozy pogody:", error);
      });
  });

  const getIcon = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) {
      return iconThunderstorm;
    } else if (statusCode >= 300 && statusCode < 400) {
      return iconDizzle;
    } else if (statusCode >= 500 && statusCode < 600) {
      return iconRain;
    } else if (statusCode >= 600 && statusCode < 700) {
      return iconIce;
    } else if (statusCode >= 700 && statusCode < 800) {
      return iconFog;
    } else if (statusCode === 800) {
      return iconSun;
    } else if (statusCode > 800 && statusCode < 900) {
      return iconCloud;
    }
  };

  const getBg = (statusCode) => {
    if (statusCode >= 200 && statusCode < 300) {
      return iconThunderstorm;
    } else if (statusCode >= 300 && statusCode < 400) {
      return "thstorm-bg";
    } else if (statusCode >= 500 && statusCode < 600) {
      return "rain-bg";
    } else if (statusCode >= 600 && statusCode < 700) {
      return "snow-bg";
    } else if (statusCode >= 700 && statusCode < 800) {
      return "thstorm-bg";
    } else if (statusCode === 800) {
      return "sun-bg";
    } else if (statusCode > 800 && statusCode < 900) {
      return "clouds-bg";
    } else {
      return " ";
    }
  };

  const maxStatus = (groupedData, keyMain) => {
    let maxStatus = Infinity * 100;
    let counter = 0;
    Object.entries(groupedData).forEach(([key, group]) => {
      if (keyMain === key) {
        group.forEach((item) => {
          let statusCurrent = item[4];

          if (
            (statusCurrent >= 200 && statusCurrent < 300) ||
            (statusCurrent > 400 && statusCurrent < 700) ||
            (statusCurrent > 800 && statusCurrent < 900)
          ) {
            if (statusCurrent < maxStatus) {
              counter++; //count bad weather
              maxStatus = statusCurrent;
            }
          } else {
            if ((statusCurrent === 800) & (counter === 0)) {
              maxStatus = statusCurrent;
            }
          }
        });
      }
    });

    return maxStatus;
  };

  const maxTemp = (groupedData, keyMain) => {
    let maxTemperature = -Infinity;

    Object.entries(groupedData).forEach(([key, group]) => {
      if (keyMain === key) {
        group.forEach((item) => {
          let temperature = item[1];
          if (temperature > maxTemperature) {
            maxTemperature = temperature;
          }
        });
      }
    });
    return maxTemperature;
  };

  const minTemp = (groupedData, keyMain) => {
    let minTemperature = Infinity;

    Object.entries(groupedData).forEach(([key, group]) => {
      if (keyMain === key) {
        group.forEach((item) => {
          let temperature = item[1];
          if (temperature < minTemperature) {
            minTemperature = temperature;
          }
        });
      }
    });
    return minTemperature;
  };

  const setDateKey = (key) =>{
    let date = new Date(key);
    let day = date.toString().split(" ")[0];
    
    return day+" "+date.toLocaleDateString("pl-PL");;
  }

  const containerWeather = (option) => {
    console.log(typeof allWeather == "string");
    try {
      if (typeof allWeather == "string") {
        let allDatas = JSON.parse(allWeather);
        const groupedData = allDatas.reduce((groups, item) => {
          const key = item[0]; // Klucz główny - pierwszy element w tablicy
          if (!groups[key]) {
            groups[key] = []; // Tworzenie nowej grupy, jeśli jeszcze nie istnieje
          }
          groups[key].push(item.slice(1)); // Dodawanie reszty elementów do grupy

          return groups;
        }, {});

        if (option === true) {
          return (
            <div id="weatherDetails2" class="setBox">
              {Object.entries(groupedData).map(([key, group]) => (
                <div key={key} className="App-panel-group">
                  <h2 className="App-panel3 sticky">{setDateKey(key)}</h2>
                  {group.map((item, index) => (
                    <div key={index} className="App-panel2">
                      <div class="hours">
                        <h3>{item[0].toString().slice(0, 5)}</h3>
                      </div>
                      <div className="weatherData2">
                        {Math.round(item[1])}
                        {tempUnit}
                      </div>
                      <div className="icon2">
                        <img
                          src={getIcon(item[4])}
                          alt="sun"
                          className="App-icon"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        } else {
          let dateCurrent = new Date();

          return (
            <div id="weatherDetails">
              {Object.entries(groupedData).map(
                ([key, group]) =>
                  key !== dateCurrent.toISOString().slice(0, 10) && (
                    <React.Fragment key={key}>
                      <div className="App-panel4">
                        <h2>{new Date(key).toString().split(" ")[0]}</h2>
                        <div className="weatherData2">
                          {Math.round(maxTemp(groupedData, key))}°/
                          {Math.round(minTemp(groupedData, key))}
                          {tempUnit}
                        </div>
                        <div className="icon2">
                          <img
                            src={getIcon(maxStatus(groupedData, key))}
                            alt="icon"
                            className="App-icon"
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  )
              )}
            </div>
          );
        }
      }
    } catch {}
  };

  const handleClick1 = () => {
    setOption(true);
  };

  const handleClick2 = () => {
    setOption(false);
  };

  return (
    <Layout>
      {!delayed && (
        <section className={getBg(status)}>
          <div className="App-panel">
            <date className="date">
              <div className="left">
                {dateCurrent.toString().split(" ")[0] + " "}

                {dateCurrent.toLocaleDateString("pl-PL")}
              </div>
              <div className="right">
                {dateCurrent.toString().split(" ")[4].slice(0, 5)}
              </div>
            </date>
            <div className="content">
              <h2>{WeatherAPIConf.API_CITY}</h2>
              <div className="weatherData">
                <div class="temp">{temperature + tempUnit}</div>
                <div class="icon">
                  <img src={getIcon(status)} />
                </div>
              </div>
            </div>
          </div>
          <div class="App-panel-buttons">
            <button onClick={handleClick1}>pogoda godzinowa po godzinie</button>
            <button onClick={handleClick2}>pogoda najbliższe na 5 dni</button>
          </div>
          {containerWeather(option)}
        </section>
      )}
    </Layout>
  );
}

export default WeatherForcast;
