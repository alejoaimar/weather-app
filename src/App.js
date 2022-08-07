import React, { useState } from "react";
import MainCard from "./MainCard";
import NextDaysCard from "./NextDaysCard";
import "./assets/main.css";

function App() {
  const [weatherData, setWeatherData] = useState([{}]);
  const [location, setLocation] = useState("");
  const [current, setCurrent] = useState([]);

  const getWeather = (event) => {
    if (event.key === "Enter") {
      fetch(`https://weatherdbi.herokuapp.com/data/weather/${location}`)
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data);
          setCurrent({
            region: data.region,
            max_temp: { c: data.currentConditions.temp.c },
            iconURL: data.currentConditions.iconURL,
            comment: data.currentConditions.comment,
            day: data.currentConditions.dayhour,
            precip: data.currentConditions.precip,
            humidity: data.currentConditions.humidity,
            wind: { km: data.currentConditions.wind.km },
          });
          setLocation("");
        });
    }
  };

  function changeCurrent(index) {
    setCurrent(weatherData.next_days[index]);
  }

  return (
    <div className="container mx-auto">
      <input
        className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 my-10"
        placeholder="Enter a location"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        onKeyPress={getWeather}
      />
      {typeof weatherData.currentConditions === "undefined" ? (
        <div>
          <p className="font-semibold text-center text-xl text-slate-700">
            You have to type a location to obtain data.
          </p>
        </div>
      ) : (
        <div>
          <MainCard
            region={weatherData.region}
            precip={typeof current.precip !== "undefined" ? current.precip : ""}
            humidity={
              typeof current.humidity !== "undefined" ? current.humidity : ""
            }
            wind={typeof current.wind !== "undefined" ? current.wind.km : ""}
            day={current.day}
            temperature={current.max_temp.c}
            image={current.iconURL}
            comment={current.comment}
          />
          <div className="flex justify-center">
            {weatherData.next_days.map((next_day, index) => {
              return (
                <button
                  className=" hover:bg-gray-200 p-3 rounded"
                  onClick={(event) => changeCurrent(index)}
                  key={index}
                >
                  <NextDaysCard props={next_day} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {weatherData.code === 0 ? (
        <p className="font-semibold text-center text-lg text-red-500">
          Location not found.
        </p>
      ) : (
        <></>
      )}
    </div>
  );
}

export default App;
