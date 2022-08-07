import "./assets/main.css";

function NextDaysCard({ props }) {
  return (
    <div className="w-24 h-28 mx-auto">
      <p className="font-medium text-slate-700">{props.day}</p>
      <img src={props.iconURL} alt="weather-pic" className="m-auto"></img>
      <p className="text-slate-600 text-sm">Max: {props.max_temp.c} °</p>
      <p className="text-slate-600 text-sm">Min: {props.min_temp.c} °</p>
    </div>
  );
}

export default NextDaysCard;
