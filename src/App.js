import React, { useState } from "react";
import MainCard from "./MainCard";
import NextDaysCard from "./NextDaysCard";
import Toggle from "./Toggle";
import Spinner from "./Spinner";
import "./assets/main.css";

function App() {
  const [weatherData, setWeatherData] = useState([{}]);
  const [location, setLocation] = useState("");
  const [current, setCurrent] = useState([]);
  const [position, setPosition] = useState(false);
  const [loading, setLoading] = useState(false);

  const getWeather = (event) => {
    if (event.key === "Enter") {
      setLoading(true);
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
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
        });
    }
  };

  function changeCurrent(index) {
    setCurrent({ ...weatherData.next_days[index], index });
  }

  const toggle = () => {
    let newPosition = !position;
    setPosition(newPosition);
  };

  return (
    <div className={`${position ? "dark" : ""} h-screen w-screen relative`}>
      <div className="dark:bg-gray-800 h-full">
        <div className="flex flex-row-reverse pr-10 pt-6">
          <Toggle toggle={toggle} />
        </div>
        <div className="mx-auto h-full w-4/5 pt-10">
          <input
            className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-10"
            placeholder="Enter a location"
            onChange={(e) => setLocation(e.target.value)}
            value={location}
            onKeyPress={getWeather}
          />
          {loading ? (
            <div className="flex justify-center w-full">
              <Spinner />
            </div>
          ) : (
            <>
              {typeof weatherData.currentConditions === "undefined" ? (
                <div>
                  <p className="font-semibold text-center text-xl text-slate-700 dark:text-slate-100">
                    You have to type a location to obtain data.
                  </p>
                </div>
              ) : (
                <div>
                  <MainCard
                    region={weatherData.region}
                    precip={
                      typeof current.precip !== "undefined"
                        ? current.precip
                        : ""
                    }
                    humidity={
                      typeof current.humidity !== "undefined"
                        ? current.humidity
                        : ""
                    }
                    wind={
                      typeof current.wind !== "undefined" ? current.wind.km : ""
                    }
                    day={current.day}
                    temperature={current.max_temp.c}
                    image={current.iconURL}
                    comment={current.comment}
                    min_temp={
                      typeof current.min_temp !== "undefined"
                        ? current.min_temp.c
                        : ""
                    }
                  />
                  <div className="flex justify-center">
                    {weatherData.next_days.map((next_day, index) => {
                      return (
                        <NextDaysCard
                          key={index}
                          onClick={(event) => changeCurrent(index)}
                          selected={current.index === index}
                          nextDay={next_day}
                        />
                      );
                    })}
                  </div>
                </div>
              )}
            </>
          )}

          {weatherData.code === 0 && !loading ? (
            <p className="font-semibold text-center text-lg text-red-500">
              Location not found.
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
