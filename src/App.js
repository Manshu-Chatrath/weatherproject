import React, { useEffect, useState } from 'react';
import SevenDayReport from './components/sevendays';
import LatLongContext from './contexts/LatLongContext';
import openWeatherApi from './components/openWeatherApi';
import WeatherDataContext from './contexts/WeatherDataContext';
import {Route,Router} from 'react-router-dom';
import CityContext from './contexts/CityContext';
import MapContainer from './components/map';
import Loading from './components/loader';
import Chart from './components/chart';
import history from './components/history';
const App=()=>{
        console.log("invoked")
        const [latLongValues,setLatLongValues]=useState({lat: 45.508888,long: -73.561668})
        const [city,setCity]=useState('Montreal, QC')
        const [weatherData,setWeatherData]=useState(null);
        useEffect(()=>{
        (async()=>{
        const response=await openWeatherApi.post(`onecall?lat=${latLongValues.lat}&lon=${latLongValues.long}&exclude=hourly,minutely&appid=${openweatherapikey}&units=metric`);
        setWeatherData(response.data);
         })();
},[latLongValues.lat,latLongValues.long])

          if(weatherData)
          {
                return(
                        <React.Fragment >
                                <Router history={history}>
                                <LatLongContext.Provider value={{latLongValues,setLatLongValues}}>
                                <WeatherDataContext.Provider value={{weatherData,setWeatherData}}>
                                <CityContext.Provider value={{city,setCity}}>
                                <Route exact path="/" component={SevenDayReport}   />    
                                <Route exact path="/graph" component={Chart } /> 
                                <Route exact path="/changelocation" component={MapContainer} />
                                </CityContext.Provider>
                                </WeatherDataContext.Provider>
                                </LatLongContext.Provider>
                                </Router>
                        </React.Fragment>
                        )  
          }
                                 
            else {
                return(<Loading />)
            }

                        

  
}
export default App;