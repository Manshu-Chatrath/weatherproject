
import '../css/sevenday.css';
import React, { useState,useContext } from 'react';
import LatLongContext from '../contexts/LatLongContext';
import WeatherDataContext from '../contexts/WeatherDataContext';
import CityContext from '../contexts/CityContext';
import { Link } from 'react-router-dom';
import Nav from './nav';
const SevenDayReport=()=>{
const {latLongValues}=useContext(LatLongContext);
const {city}=useContext(CityContext);
const {weatherData}=useContext(WeatherDataContext);
const [dayTime,setDay]=useState(true);
var moment=require('moment-timezone');


const currentWindDirection=(wind_deg)=>{
  
        if(wind_deg===0)
        {
            return 'N'
        }
        else if(wind_deg>0 && wind_deg<90)
        {
            return 'NE'
        }
        else if(wind_deg===90)
        {
           return 'E'
        }
        else if(wind_deg>90 && wind_deg<180)
        {
            return 'SE'
        }
        else if(wind_deg===180)
        {
            return 'S'
        }
        else if(wind_deg>180 && wind_deg<270)
        {
            return 'SW'
        }
       else  if(wind_deg===270)
        {
            return 'W'
        }
        else if(wind_deg>270 && wind_deg<360)
        { 
            return 'NW'
        }
    
}
const windGust=()=>{

    if(weatherData.current.wind_gust )
    {
     return( <div className="dailyinfo"> 
        <div className="dailyinfotitle"><span> Wind gust</span></div>
         <div className="dailyweatherinfo">
             <div className="dailyinfodigit">{Math.round(weatherData.current.wind_gust*18/5)}</div>
             <div className="units">km/h</div>
         </div>
   </div>)
    }
 return( <div className="dailyinfo"> 
        <div className="dailyinfotitle"><span>Dew Point</span></div>
        <div className="dailyweatherinfo">
            <div className="dailyinfodigit">{Math.round(weatherData.current.dew_point)}°</div>
        </div>
        </div>
        )
        
      
}

const currentStory=()=>{
        if(weatherData.alert  &&  weatherData.current.weather.length>0)
        {
                return(<div className="box">
                <div className="title">Today's Story</div>
                <div className="story">{weatherData.alert }</div>    
            </div>)  
        }

    return;

}

const currentOtherInfo=()=>{
    let time=riseSetTime(weatherData.current.sunset,weatherData.current.sunrise);
    return(
        <div className="todayinfo">

            <div className="todaytemp">
                <div className="dailyinfo">
                    <div className="dailyinfotitle">Wind</div>
                    <div className="dailyweatherinfo">
                        <div className="dailyinfodigit">{Math.round(weatherData.current.wind_speed*18/5)}</div>
                        <div className="windunits">
                            <div>{currentWindDirection(weatherData.current.wind_deg)}</div>
                            <div>km/h</div>
                        </div>
                    </div>
                </div>
                <div className="dailyinfo">
                    <div className="dailyinfotitle">Humidity</div>
                    <div className="dailyweatherinfo">
                        <div className="dailyinfodigit">{weatherData.current.humidity}</div>
                        <div className="units">%</div>
                    </div>
                </div>
                <div className="dailyinfo">  
                    <div className="dailyinfotitle">Visibility</div>
                    <div className="dailyweatherinfo">
                        <div className="dailyinfodigit">{weatherData.current.visibility/1000}</div>
                        <div className="units">km</div>
                    </div>
                </div>
                <div className="dailyinfo"> 
                     <div className="dailyinfotitle">Sunrise</div>
                    <div className="dailyweatherinfo">
                        <div className="dailyinfodigit">{time.riseHours}:{time.riseMinutes}</div>
                        <div className="units">{time.riseUnit}</div>
                    </div>
                </div>
                {windGust()}
                <div className="dailyinfo">  
                    <div className="dailyinfotitle">Pressure</div>
                    <div className="dailyweatherinfo">
                        <div className="dailyinfodigit">{(weatherData.current.pressure*0.1).toFixed(1)}</div>
                        <div className="units">kPa</div>
                    </div>
                </div>
                <div className="dailyinfo"> 
                     <div className="dailyinfotitle">Clouds</div>
                    <div className="dailyweatherinfo">
                        <div className="dailyinfodigit">{weatherData.current.clouds}</div>
                        <div className="units">%</div>
                    </div>
                </div>
                <div className="dailyinfo"> 
                    <div className="dailyinfotitle">Sunset</div>
                    <div className="dailyweatherinfo">
                        <div className="dailyinfodigit">{time.setHours}:{time.setMinutes}</div>
                        <div className="units">{time.setUnit}</div>
                    </div>
                </div>
            </div>

            <div className="extrainfo">
                    <div style={{color: 'white', lineHeight: '25px'}}>UV</div> 
                    <div  className={`${Math.round(weatherData.current.uvi) > 5 ? "dangerbadge " : (Math.round(weatherData.current.uvi)<5 && Math.round(weatherData.current.uvi)>2) ? "moderatebadge" : "badge"}`}>
                    {Math.round(weatherData.current.uvi)}</div>
                    <div style={{marginLeft: '20px',lineHeight: '25px',color: 'white',fontWeight: 'bold'}}>
                    {`${Math.round(weatherData.current.uvi) > 5 ? "Dangerous" : (Math.round(weatherData.current.uvi)<5 && Math.round(weatherData.current.uvi)>2) ? "Bad" : "Good"}`}
                    </div>
            </div>

        </div>)
}

const topbar=()=>{

        return(
            <div className="temperature-details">
            <div className="temperature-information">
                <div className="location-title">{city} Weather</div>
                <span className="lastUpdated">Updated on {moment().format('ddd ,MMM D, h:mm a')}</span>
            </div>
            <div className="temperature-add-location">
                <div className="add-location">
                    <div className="location-button">
                        <Link to="/changeLocation" className="changeLocation" style={{color: "white",cursor: 'pointer',textDecorationLine: 'underline'}}>Change Location</Link>
                    </div>
                </div>
            </div>
        </div>
        )
    }

    const today=()=>{
     
        return(
        <div className="weather">
        <div className="w">
            <div className="weatherinfo">

                    <div>
                        <div className="tempdigit">{Math.round(weatherData.current.temp)}</div>
                    </div>
                
                    <div className="tempinfo">
                        <div className="celsuis">°C</div>
                        <div className="tempfill">
                            <div  className="feeltitle">
                                <div>FEELS</div>
                                <div style={{marginLeft: '10px'}}>LIKE</div>
                            </div>

                            <div className="tempno">{ Math.round(weatherData.current.feels_like)}</div>
                        </div>
                    </div>
                    <div className="weatherimage">
                        <img className="tempimage" src={`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`} alt=""/>
                    </div>
                 
            </div>
         <div className="weatherKeyword">{weatherData.current.weather.length > 0 ? weatherData.current.weather[0].main : null}</div>
        </div>
        
        <div className="weather-story">
         {currentStory()} 
        </div>
    </div>)
    }
    const riseSetTime=(setTime,riseTime)=>{
        let timeOffset=weatherData.timezone_offset >0 ? -weatherData.timezone_offset : weatherData.timezone_offset;
        let utcOffSet=moment().tz(weatherData.timezone).utcOffset();
        let set=new Date(setTime*1000-(timeOffset *1000)+utcOffSet*60000);
        let rise=new Date(riseTime*1000-(timeOffset*1000)+utcOffSet*60000);
        let setUnit=set.getHours() >= 12 ? 'PM' : 'AM';
        let riseUnit=rise.getHours() >= 12  ? 'PM' : 'AM';
        let setHours=set.getHours() > 12 ? ((set.getHours()-12) < 10 ? '0'+(set.getHours()-12) : (set.getHours()-12)) : ((set.getHours() < 10 ? '0'+set.getHours() : set.getHours()))
        let setMinutes=set.getMinutes()<10 ? '0'+set.getMinutes() : set.getMinutes();
        let riseHours=rise.getHours() > 12 ? ((rise.getHours()-12) < 10 ? '0'+(rise.getHours()-12) : (rise.getHours()-12)) : ((rise.getHours() < 10 ? '0'+rise.getHours() : rise.getHours()))
        let riseMinutes=rise.getMinutes()<10 ? '0'+rise.getMinutes() : rise.getMinutes();
        let result={setUnit: setUnit,riseUnit: riseUnit,riseHours: riseHours,riseMinutes: riseMinutes,setHours: setHours,setMinutes: setMinutes}
        return result;
    }
    const toggle=()=>{
        let change=!dayTime;
        setDay(change);
    }
    const nextSevendays=()=>{
        if(weatherData.daily.length>0)
        {
            const days=weatherData.daily.map((day,index)=>{
                if(index>0)
                {
                let utcOffSet=moment().tz(weatherData.timezone).utcOffset();
                let date=new Date(day.dt*1000-(weatherData.timezone_offset*1000)+utcOffSet*60000);      
                return(
                        <div key={index}  className="weekday">
                            <div style={{color : !dayTime ? 'white' : 'black',background: dayTime ? (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#F3F3F3' : '#FAFAFA') : (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#72879C' : '#8FA1B1')}} className="day">
                                <div style={{color : !dayTime ? 'white' : 'black'}}> <span>{moment(date).format('ddd')}</span></div>
                                <div style={{color : !dayTime ? 'white' : 'black'}} className="date"> <span>{moment(date).format('M/D')}</span> </div>
                            </div>
                            <div style={{color : !dayTime ? 'white' : 'black',background: dayTime ? (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#F3F3F3' : '#FAFAFA') : (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#72879C' : '#8FA1B1')}} className="daydescription">
                                <div> <span>{day.weather[0].description}</span></div>
                            </div>
                            <div style={{color : !dayTime ? 'white' : 'black',background: dayTime ? (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#F3F3F3' : '#FAFAFA') : (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#72879C' : '#8FA1B1')}} className="weathericon">
                                <img className="dayweatherimage" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt=""/>
                            </div>
                            <div style={{color : !dayTime ? 'white' : 'black',background: dayTime ? (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#F3F3F3' : '#FAFAFA') : (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#72879C' : '#8FA1B1')}} className="daytemperature">
                                <span>{`${dayTime ? Math.round(day.temp.day) : Math.round(day.temp.night)}`}</span>
                                <span className="weatherunit">°</span>
                            </div>
                            <div className="dayinfo">
                                <div className="daytempinfo" id="top" style={{ color : !dayTime ? 'white' : 'black',background: dayTime ? (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#E4E4E4' : '#F3F3F3') : (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#57718A' : '#72879C')}}><span className="information">{`${dayTime ? Math.round(day.feels_like.day) : Math.round(day.feels_like.night)}`}°</span></div>

                                <div className="daytempinfo" style={{color : !dayTime ? 'white' : 'black',background: dayTime ? (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#F3F3F3' : '#FAFAFA') : (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#72879C' : '#8FA1B1')}}>
                                    <span className="information">{`${!dayTime ? Math.round(day.temp.day) : Math.round(day.temp.night)}`}°</span>
                                </div>

                                <div className="daytempinfo" style={{color : !dayTime ? 'white' : 'black',background: dayTime ? (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#E4E4E4' : '#F3F3F3') : (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#57718A' : '#72879C')}}><span className="information">{Math.round(day.pop)}</span><span style={{fontSize: '14px',marginLeft: '5px'}}>%</span></div>
                                <div className="daytempinfo" style={{color : !dayTime ? 'white' : 'black',background: dayTime ? (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#F3F3F3' : '#FAFAFA') : (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#72879C' : '#8FA1B1')}}><span className="information">{Math.round(day.wind_speed*18/5)}</span><span style={{fontSize: '11px', marginTop: '4px',marginLeft: '5px'}}>{currentWindDirection(weatherData.current.wind_deg)}</span></div>
                                <div className="daytempinfo" style={{color : !dayTime ? 'white' : 'black',background: dayTime ? (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#E4E4E4' : '#F3F3F3') : (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#57718A' : '#72879C')}}><span className="information">{Math.round(day.wind_gust*18/5)} </span></div>
                                <div className="daytempinfo" style={{color : !dayTime ? 'white' : 'black',background: dayTime ? (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#F3F3F3' : '#FAFAFA') : (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#72879C' : '#8FA1B1')}}><span style={{fontSize: '13px',fontWeight: 'bold'}} className="information">{`${day.rain ? day.rain+' mm' : '-'}`}</span></div>
                                <div className="daytempinfo" style={{color : !dayTime ? 'white' : 'black',background: dayTime ? (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#E4E4E4' : '#F3F3F3') : (moment(date).format('dddd')==='Saturday' || moment(date).format('dddd')==='Sunday' ? '#57718A' : '#72879C')}}><span  style={{fontSize: '13px',fontWeight: 'bold'}} className="information">{`${day.snow ? day.snow+' mm' : '-'}`}</span></div>
                            </div>
                        </div>
                  
                    )
                }
            })
            return days; 
        }
            return;
    }
    if(weatherData.current)
    {
        return( 
        
            <div className="container">
            <div className="location-container">
                <Nav />
                {topbar() }
                {today()}
                {currentOtherInfo()}
                <div className="sevendays">
                    <div className="topbar">
                        <div className="barheading">
                            <span style={{fontSize: '1.2rem', color: '#333'}}>Next 7 Days</span> 
                        </div>
                        <div className="togglebutton"> 
                            <span className="sun">☀</span>
                            <label className="switch">
                                <input type="checkbox" onClick={toggle} />
                                <span className="slider round"></span>
                              </label>
                              <span className="moon">☾</span>
                        </div>
                    </div>
                    <div className="days">
                    {nextSevendays()}
                    <div className="infoheadings">
                                <div className="unitinfo" ><div id="feel">Feels like</div></div>
                                <div className="unitinfo">
                                    <div className="single">{`${dayTime ? 'Night' : 'Day'}`}</div>
                                </div>
                                <div className="unitinfo">
                                    <div className="single">POP</div>
                                </div>
                                <div className="unitinfo" >
                                    <div>Wind (km/h) </div> 
                                </div>
                                <div className="unitinfo">
                                    <div>Wind gust (km/h)</div> 
                               </div>
                           
                                <div className="unitinfo">
                                    <div>24 Hr Rain</div>
                                </div>
                                <div className="unitinfo">
                                    <div>24 Hr Snow</div>
                                </div>
                            </div>
                    </div>
                    </div>
            </div>
            </div>)
    }
 
   else {
       return(<div>Loading...</div>)
   }
}
export default SevenDayReport;