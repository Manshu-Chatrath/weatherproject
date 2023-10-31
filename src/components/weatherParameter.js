const WeatherParameter = ({
  label,
  value,
  units,
  isUnit = false,
  currentWindDirection,
}) => {
  return (
    <div className="dailyinfo">
      <div className="dailyinfotitle">
        <span>{label}</span>
      </div>

      <div className="dailyweatherinfo">
        <div className="dailyinfodigit">{value}</div>
        {isUnit ? (
          <div className="windunits">
            <div> {currentWindDirection}</div>
            <div>km/h</div>
          </div>
        ) : (
          <div className="units">{units}</div>
        )}
      </div>
    </div>
  );
};

export default WeatherParameter;
