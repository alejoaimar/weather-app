import "./assets/main.css";

function MainCard(props) {
  return (
    <div className="flex mb-10">
      <div className="flex-auto flex align-top">
        <div className="flex mr-2">
          <img
            src={props.image}
            alt="weather-pic"
            className="w-16 h-16 mr-2"
          ></img>
          <div className="flex flex-col justify-center">
            {" "}
            <p className="text-5xl">{props.temperature} °</p>
            {props.min_temp !== "" ? (
              <p className="text-3xl text-slate-500 ml-2">{props.min_temp} °</p>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="text-slate-600 text-xs">
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
        <p className="text-xl font-semibold">{props.region}</p>
        <p className="text-slate-600 text-sm">{props.day}</p>
        <p className="text-slate-600 text-sm">{props.comment}</p>
      </div>
    </div>
  );
}

export default MainCard;
