import "./assets/main.css";

function NextDaysCard(props) {
  const { onClick, selected, nextDay } = props;
  return (
    <button
      className={`hover:bg-gray-200 p-3 rounded dark:hover:bg-gray-700 ${
        selected ? "bg-gray-200 dark:bg-gray-700 " : ""
      }`}
      onClick={onClick}
      disabled={selected}
    >
      <div className="w-24 h-28 mx-auto">
        <p className="font-medium text-slate-700 dark:text-slate-200">
          {nextDay.day}
        </p>
        <img src={nextDay.iconURL} alt="weather-pic" className="m-auto"></img>
        <p className="text-slate-600 text-sm dark:text-slate-400">
          Max: {nextDay.max_temp.c} °
        </p>
        <p className="text-slate-600 text-sm dark:text-slate-400">
          Min: {nextDay.min_temp.c} °
        </p>
      </div>
    </button>
  );
}

export default NextDaysCard;
