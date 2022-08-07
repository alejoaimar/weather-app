function MainCard(props) {
  return (
    <div className="flex mb-10">
      <div className="flex-auto flex items-center">
        <div className="flex mr-2">
          <img
            src={props.image}
            alt="weather-pic"
            className="w-16 h-16 mr-2"
          ></img>
          <div className="flex flex-col justify-center">
            {" "}
            <p className="text-5xl dark:text-white">{props.temperature} °</p>
            {props.min_temp !== "" ? (
              <p className="text-3xl text-slate-500 ml-2 dark:text-slate-400">
                {props.min_temp} °
              </p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="text-slate-600 dark:text-slate-400 text-xs">
          {props.precip !== "" ? (
            <p>Precipitations probability: {props.precip}</p>
          ) : (
            <></>
          )}
          {props.humidity !== "" ? <p>Humidity: {props.humidity}</p> : <></>}
          {props.wind !== "" ? <p>Wind: {props.wind} km/h</p> : <></>}
        </div>
      </div>
      <div className="">
        <p className="text-xl font-semibold dark:text-white">{props.region}</p>
        <p className="text-slate-600 text-sm dark:text-slate-400">
          {props.day}
        </p>
        <p className="text-slate-600 text-sm dark:text-slate-400">
          {props.comment}
        </p>
      </div>
    </div>
  );
}

export default MainCard;
