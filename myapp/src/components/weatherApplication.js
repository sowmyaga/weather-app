import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css'

const WeatherApplication =()=>{
// const [latitude,setlatitude]=useState("12.9716");
// const [longitude,setlongitude]=useState("77.5946");
const [City,setCity]=useState("banglore");
const [CountryCode,setCountryCode]=useState("IN");
const [weatherData,setweatherData]=useState([]);
let key='fda068d6c032ebd4ab07fdc98b35335f'
    useEffect(()=>{
       axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=BANGALORE,IN&appid=${key}`).then((res)=>{
        setweatherData(res.data.list)
        console.log(res.data.city.name);
        console.log(res.data.list);
       //})
        // let data=axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${key}`).then((res)=>{
        //     console.log(data);
// let data=axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m,relativehumidity_2m,precipitation,rain,snowfall,weathercode&daily=weathercode,apparent_temperature_max,precipitation_sum,rain_sum,precipitation_hours,windspeed_10m_max&current_weather=true&timezone=auto&start_date=2022-10-26&end_date=2022-11-01`).then((response)=>{
    //console.log("res",response);
})
    },[])

    const handleCityInput=(e)=>{
        setCity(e.target.value)
    }
    const handleCountryInput=(e)=>{
        setCountryCode(e.target.value)
    }
    const weatherUi=weatherData.map((item)=>{
        return(
            <>{item.main.humidity}</>
        )
    })

    return (
        <>
        <div className='form-floating'>
        {/* <label for='latitude'>latitude:</label>
         <input type='number' value={latitude}placeholder='enter latitude' onChange={handleLatitudeInput}/>
         <label>longitude:</label>
         <input type='number' value={longitude} placeholder='enter longitude' onChange={handleLongitudeInput}/> */}
         <label>City:</label>
        <input type='text' value={City} placeholder='enter City' onChange={handleCityInput}/>
        <label>country code:</label>
        <input type='text' value={CountryCode} placeholder='enter country code ex:IN' onChange={handleCountryInput}/>
        </div>
        {weatherUi}
       </>
    )
}
export default WeatherApplication;