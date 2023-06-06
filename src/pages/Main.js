import "../App.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layout/layout";
import { useCookies } from "react-cookie";

function Main({ submitHandler }) {
  const [cityName, setCityName] = useState("");
  const [units, setUnits] = useState(false);
  const [cookies, setCookie] = useCookies(["cityName, units"]);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(units);
    
    setCookie("cityName", cityName, { path: "/" });
    setCookie("units", units, { path: "/" });
    console.log(units);
    //console.log(WeatherAPI(cityName, units));
    submitHandler({ cityName, units });
    navigate("/weatherforcast");
  };

  

  return (
    <Layout>
      <section>
        <div id="searchPanel">
          <div className="App-panel">
            <h2>Search the wather</h2>
            <form method="GET" onSubmit={handleSubmit}>
              <div class="button r" id="button-3">
                <input
                  type="checkbox"
                  class="checkbox units"
                  name="units"
                  checked={units}
                  onChange={(event) => setUnits(event.target.checked)}
                />
                <div class="knobs"></div>
                <div class="layer"></div>
              </div>
              <input
                type="text"
                name="city"
                id="city"
                placeholder="city"
                value={cityName}
                onChange={(event) => setCityName(event.target.value)}
              />
              <input type="submit" value="Search" />
            </form>
          </div>
        </div>
        <div id="exampleCity">
        {/*to do*/}
        </div>
      </section>
    </Layout>
  );
}

export default Main;
