import React, { useState, useEffect } from "react";
import "./Forcast.css";
import axios from 'axios';

const Forecast = () => {
    const [weatherData, setweatherData] = useState([]);//to set week weather data
    const [currentweather, setcurrentweather] = useState([])//to current day weather data
    const [City, setCity] = useState("bangalore");//default taking current location to display weather data.
    const [unit, setUnit] = useState("");//to switch between different units
    const [isImperialUnitSelected, setIsImperialUnitSelected] = useState(false);//boolen to switch different units.

    //to get onload data to display weather data
    useEffect(() => {
        handleSearchByLocation();
    }, [])

    //onchange function to get input location value
    const handleCityInput = (e) => {
        setCity(e.target.value);
    }

    //switch units between imperial/metric units
    const handleUnits = (e) => {
        setUnit(e.target.value);
        if (e.target.value == "imperial") {
            setIsImperialUnitSelected(true);
        }
        else {
            setIsImperialUnitSelected(false);
        }
    }

    //onclick function to get searched location data
    const handleSearchByLocation = async () => {
        const data = {
            days: 7,
            location: City,
        };
        const headers = {
            'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`,
            'Content-Type': 'application/json'
        };
        await axios.post(`${process.env.REACT_APP_API}`, data, { headers })
            .then((response) => {
                if (!response) {
                    return false;
                }
                else {
                    setcurrentweather(response ? response.data : null)
                    setweatherData(response ? response.data : null)
                }
            });
    }

    //to get Ui week weather data
    const weatherUi = Object.keys(currentweather).length ? weatherData.forecast.map((item) => {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var d = new Date(item.date);
        var dayName = days[d.getDay()];
    
        return (
            <>
                <span className='weather-weekdays'>
                    <div>
                        <div className="weather-weekdays-style"><b>{dayName}</b></div>
                        <img src={item.icon_url} style={{ width: "80px", height: "80px" }} />
                        <div style={{ "textAlign": "center" }}>
                            <span>{isImperialUnitSelected ? <b>{item.max_temp_f}&deg;F</b> : <b>{item.max_temp_c}&deg;C</b>}</span>&nbsp;&nbsp;
                            <span style={{ "fontWeight": "200" }}>{isImperialUnitSelected ? <span>{item.min_temp_f}&deg;F</span> : <span>{item.min_temp_c}&deg;C</span>}</span>
                        </div>
                        <div style={{ "fontWeight": "200", "fontSize": "12px", "textAlign": "center" }}>{item.condition}</div>
                    </div>
                </span>

            </>
        )
    }) : ""

    //formatting date
    var dob = new Date(Object.keys(currentweather).length ? currentweather.forecast[0].date : "");
    var dobArr = dob.toDateString().split(' ');
    var dobFormat = dobArr[0] + ',' + dobArr[1] + ' ' + dobArr[2]
    return (
        <>

            <div className='form-floating'>
                <div>
                    <input type='text' value={City} placeholder='enter City' onChange={handleCityInput} />&nbsp;
                    <button onClick={handleSearchByLocation}>search</button>
                </div>
                <div>select by units:<select onChange={handleUnits} value={unit}>
                    <option value="metric">Metric</option>
                    <option value="imperial">Imperial</option>
                </select></div>
            </div><br />
            <div className="card">
                <div className='row'>
                    <div className='column'>
                        <div style={{ "fontSize": "36px" }}><b>{Object.keys(currentweather).length ? currentweather.location : ""}</b></div>
                        <div>{dobFormat} &nbsp;Overcast</div>
                        <div style={{ "display": "flex" }}>
                            <img src={Object.keys(currentweather).length ? currentweather.forecast[0].icon_url : ""} style={{ "width": "109px" }} />&nbsp;
                            {isImperialUnitSelected ? <p style={{ "marginTop": "44px" }}><b>{Object.keys(currentweather).length ? currentweather.forecast[0].max_temp_f : ""}&deg;F</b></p> : <p style={{ "marginTop": "44px" }}><b>{Object.keys(currentweather).length ? currentweather.forecast[0].max_temp_c : ""}&deg;C</b></p>}
                        </div>
                    </div>

                    <div className='column'>
                        <div className="weather-data">Precipitation:{Object.keys(currentweather).length ? currentweather.forecast[0].chance_of_rain : ""}%</div>
                        <div className="weather-data">Humidity:97%</div>
                        {isImperialUnitSelected ? <div className="weather-data">Wind:{Object.keys(currentweather).length ? <span>{currentweather.forecast[0].max_wind_mph}mph SW</span> : ""}</div> : <div className="weather-data">Wind:{Object.keys(currentweather).length ? <span>{currentweather.forecast[0].max_wind_kph}kph SW</span> : ""}</div>
                        }
                        <div className="weather-data">Pollen Count:36</div>
                    </div>
                </div>
                {weatherUi}
            </div>
        </>
    )
}
export default Forecast;