import React, { useState,useEffect,useContext } from 'react';
import LatLongContext from '../contexts/LatLongContext';
import WeatherDataContext from '../contexts/WeatherDataContext';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Nav from './nav';
import '../css/chart.css';
import Loading from './loader';
const Chart=()=>{
  var moment=require('moment-timezone');
  const {latLongValues}=useContext(LatLongContext);
  const {weatherData}=useContext(WeatherDataContext);
  const [data,setChartData]=useState(null);
  const [weatherDescription, setWeatherDescription] = useState(null);
    useEffect(()=>{
        let arr=[];
        let tempHigh=[];
        let tempLow=[];
        let description=[];
        let timeZoneOffSet=weatherData.timezone_offset;
        weatherData.daily.map((day,index)=>{
            if(index<=6)
            {  
                let utcOffSet=moment().tz(weatherData.timezone).utcOffset();
                let date=new Date(day.dt*1000-(timeZoneOffSet*1000)+utcOffSet*60000);   
                arr.push(moment(date).format('ddd'));
                tempHigh.push(day.temp.max);
                tempLow.push(day.temp.min);
                description.push({description: day.weather[0].description,day: moment(date).format('ddd') });
            }
        })
            setWeatherDescription(description);
            setChartData({ backgroundColor: 'blue',
            labels: arr,
             datasets: [{
                title: arr,
                label: 'Low',
                 data: tempLow,
                 backgroundColor: [
                     'darkblue',
                 ],
                 borderColor: [
                     'darkblue',
                 ],
             },
             {
                 label: 'High',
                 data: tempHigh,
                 backgroundColor: [
                     '#F0BC00',
                 ],
                 borderColor: ['#F0BC00']
             },
          ],
        })
    
    },[latLongValues.lat,latLongValues.long])

const footer=(tooltipItems)=>{
    let tooltip=tooltipItems[0];
    for(let i=0;i<weatherDescription.length;i++)
    {
        if(tooltip.label==weatherDescription[i].day)
        { 
            return weatherDescription[i].description;
        }
    }
}

if(data)
{
    return(
        <div className="container2">
        <div className="location-container2">
         <Nav />
         <div style={{textAlign: 'center',color: 'white'}}><h2>Graphical Representation</h2></div>
          <Line className="linegraph" data={data} options={{
              
              plugins: {
                tooltip: {
                  callbacks: {
                   footer: footer
                  } } },scales: {x:{grid: {color: 'white' } },}}} />
        </div>
        </div>
        )
}

    return(<Loading />)

    }    


export default Chart;