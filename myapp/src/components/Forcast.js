import React, { useState, useEffect } from "react";
import axios from 'axios';
import "./Forcast.css";
const Forecast = () => {
    const [weatherData, setweatherData] = useState([]);
    const [currentweather, setcurrentweather] = useState([])
    const [City, setCity] = useState("bangalore");
    const [unit, setUnit] = useState("Metric");
    const [isImperialUnitSelected,setIsImperialUnitSelected]=useState(false);
    useEffect(() => {
        const article = {
            days: 7,
            location: City,
        };
        const headers = {
            'Authorization': 'Bearer MGEyMmIzNmMtYzU4My00YTA0LWIyMWMtZDhlZWFjYmE5NzIx',
            'Content-Type': 'application/json'
        };
        axios.post('https://api.m3o.com/v1/weather/Forecast', article, { headers })
            .then((response) => {
                setcurrentweather(response?response.data:null)
                setweatherData(response?response.data:null)
                // console.log(response.data)
                // // console.log(currentweather.forecast[0].date)
                // console.log(Object.keys(response.data).length)
            });
    }, [])
    const handleCityInput = (e) => {
        setCity(e.target.value);
    }
    const handleUnits=(e)=>{
        // handleSearchByLocation();
        setUnit(e.target.value);
        if(e.target.value=="imperial"){
            console.log(e.target.value=="imperial")
            setIsImperialUnitSelected(true);
        }
        else{
            setIsImperialUnitSelected(false);
        }
    }
    const handleSearchByLocation=async()=>{
        const article = {
            days: 7,
            location: City,
        };
        const headers = {
            'Authorization': 'Bearer MGEyMmIzNmMtYzU4My00YTA0LWIyMWMtZDhlZWFjYmE5NzIx',
            'Content-Type': 'application/json'
        };
        await axios.post('https://api.m3o.com/v1/weather/Forecast', article, { headers })
            .then((response) => {
                if(!response){
                    return false;
                }
                else{
                    setcurrentweather(response?response.data:null)
                    setweatherData(response?response.data:null)
                }
                
                // console.log(response.data)
                // // console.log(currentweather.forecast[0].date)
                // console.log(Object.keys(response.data).length)
            });
    }
       const weatherUi =weatherData.forecast.length>0?weatherData.forecast.map((item) => {
                var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var d = new Date(item.date);
            var dayName = days[d.getDay()];
            console.log(dayName)
                return (
                    // <>{item.main.humidity}</>
                    <>
                           <span className='weather-weekdays'>
                                <div>
                                    <div className="weather-weekdays-style"><b>{dayName}</b></div>
                                    <img src={item.icon_url} style={{width:"108px",height:"108px"}}/>
                                    <div style={{"textAlign":"center"}}>
                                        <span>{isImperialUnitSelected?<b>{item.max_temp_f}&deg;F</b>:<b>{item.max_temp_c}&deg;C</b>}</span>&nbsp;&nbsp;
                                        <span style={{"fontWeight":"200"}}>{isImperialUnitSelected?<span>{item.min_temp_f}&deg;F</span>:<span>{item.min_temp_c}&deg;C</span>}&deg;</span>
                                    </div>
                                    <div style={{"fontWeight":"200","fontSize":"12px","textAlign":"center"}}>{item.condition}</div>
                                    </div>
                                </span>

                    </>
                )
            }):""

   

    return (
        <>

            <div className='form-floating'>
                <div>
                <input type='text' value={City} placeholder='enter City' onChange={handleCityInput} />
                <button onClick={handleSearchByLocation}>searchbyLocation</button>
                </div>
                <div><select onChange={handleUnits} value={unit}>
                    <option value="metric">Metric</option>
                    <option value="imperial">Imperial</option>
                    </select></div>
            </div><br/>
            <div className="card">
            <div className='row'>
                <div  className='column'>
                    <div style={{"fontSize":"36px"}}><b>{Object.keys(currentweather).length ? currentweather.location : ""}</b></div>
                    <div>{Object.keys(currentweather).length ? currentweather.forecast[0].date : ""}</div>
                    <div>
                    <img src={Object.keys(currentweather).length ? currentweather.forecast[0].icon_url : ""} />&nbsp;
                    {isImperialUnitSelected? <b>{Object.keys(currentweather).length ? currentweather.forecast[0].max_temp_f : ""}&deg;F</b>: <b>{Object.keys(currentweather).length ? currentweather.forecast[0].max_temp_c : ""}&deg;C</b>}
                      </div>
                </div>

                <div className='column'>
                    <div className="weather-data">precipitation:{Object.keys(currentweather).length ? currentweather.forecast[0].chance_of_rain : ""}%</div>
                    <div className="weather-data">Humidity:97%</div>
                    {isImperialUnitSelected?  <div className="weather-data">Wind:{Object.keys(currentweather).length ?<span>{currentweather.forecast[0].max_wind_mph}mph SW</span>:""}</div>:  <div className="weather-data">Wind:{Object.keys(currentweather).length ?<span>{currentweather.forecast[0].max_wind_kph}kph SW</span>:""}</div>
                    }
                    <div className="weather-data">Pollen Count:36</div>
                </div>
            </div>
            {isImperialUnitSelected?weatherUi:weatherUi}
            </div>
        </>
    )
}
export default Forecast;