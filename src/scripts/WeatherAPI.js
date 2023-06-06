import React from "react";
import axios from "axios";

function WeatherAPI(cityName, units) {
  const API_LINK = "https://api.openweathermap.org/data/2.5/forecast?q=";
  const API_CITY = cityName;
  const API_KEY = "&appid=40d8a3d28933fed8ca1119a3b10c7e04";
  const API_UNITS = units === false ? "&units=metric" : "&units=imperial";
  const API_LANG = "&lang=pl";

  const API_URL = API_LINK + API_CITY + API_UNITS + API_KEY;
  let tabWeek = [];
  console.log(API_URL);
  try {
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
        console.log(1);
        //return tabWeek;

        // let morning = '06:00:00';
        // let afternoon = '12:00:00';
        // let evening = '18:00:00';
        // let night = '21:00:00';
        // let dayTab = [morning, afternoon, evening, night];
        // console.log(res.data);

        // for (let k = 1; k <= 5; k +=1 ) {
        // for (let j = 1; j <= 8; j += 1) {
        //   let iterator = j*k-1;
        //   // for (let i = 0; i < dayTab.length; i+=2) {
        //   console.log(j);
        //   console.log(res.data.list[iterator]);
        //   console.log(res.data.list[iterator].main["preasure"]); //ciśnienie,
        //   console.log(res.data.list[iterator].main["humidity"]); //wilgotność
        //   console.log(res.data.list[iterator].main["temp"]); //temperatura
        //   console.log(res.data.list[iterator].weather["id"]); //status pogody - ikona
        //   console.log(res.data.list[iterator].dt_txt); //status pogody - ikona

        //   let date = res.data.list[iterator].dt_txt;
        //   let [datePart, timePart] = date.split(" ");

        //   // for(let i=0; i< dayTab.length; i++){
        //   //   if(dayTab[i] == timePart){

        //   //   }
        //   // }

        //   let status = res.data.list[iterator].weather["id"];
        //   let humidity = res.data.list[iterator].main["humidity"];
        //   let preasure = res.data.list[iterator].main["preasure"];
        //   //let date = res.data.list[dayTab[0] + j].dt_txt;
        //   date = date.slice(0, 10);

        //   let tempMor = res.data.list[iterator].main["temp"];
        //   let tempEvn = res.data.list[iterator].main["temp"];

        //   let tabDay = [date, tempMor, tempEvn, preasure, humidity, status];

        //   tabWeek.push(tabDay);

        //   // return (
        //   //   <div id="exampleCity">
        //   //     <div key={j - 7} className="App-panel2">
        //   //       <h3>{date}</h3>
        //   //       <div className="App-degree">
        //   //         <p>tempMor&deg;C / tempEvn&deg;C</p>
        //   //       </div>
        //   //       <div>
        //   //         {/* <img src={sun} alt="sun" className="App-icon" /> */}
        //   //       </div>
        //   //     </div>
        //   //   </div>
        //   // );
        //   }
        // }
        //return tabWeek;
        // console.log(res.data.list[afternoon]);
        // console.log(res.data.list[evening]);
        // console.log(res.data.list[night]);
        //console.log(res.data.main['temp']);
      })
      .catch((error) => {
        //console.error("Błąd pobierania prognozy pogody:", error);
      });
  } catch {
    console.log("xd");
    //return tabWeek;
  }

  console.log(tabWeek.length);
  //  return (
  //    <div id="exampleCity">
  //      <div className="App-panel2">
  //        <h3>XD</h3>
  //        <div className="App-degree">
  //          <p>tempMor&deg;C / tempEvn&deg;C</p>
  //        </div>
  //        <div>{/* <img src={sun} alt="sun" className="App-icon" /> */}</div>
  //      </div>
  //    </div>
  //  );
}

export default WeatherAPI;
