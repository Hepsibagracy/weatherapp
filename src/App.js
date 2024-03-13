
import './App.css';
import searchicon from "./assets/search-icon.png"
import rainyicon from './assets/rainy.jpeg';
import clearicon from './assets/sunny.jpeg';
import snowicon from './assets/snowicon.jpeg';
import drizzleicon from './assets/drizzle.jpeg';
import cloudyicon from './assets/cloudy.jpeg';
import windicon from './assets/windy.jpeg';
import humidityicon from './assets/humid.jpeg'
import { useEffect, useState } from 'react';
import axios from "axios";



const Weather = ({ icon, temp, city, country, lat, long,humidity,wind }) => {
  return (
    <>
      <div className='images'>
        <img src={icon} alt='image' width='200px' height='150px'/>
      </div>
      <div className='temp'>{temp} °c</div>
      <div className='location'>{city}</div>
      <div className='country'>{country}</div>
      <div className='coordinate'>
        <div>
          <span className='lat'>latitude </span>
          <span className='lat'>{lat}</span>
          
        </div>
        <div>
        <span className='long'>longitude </span>
        <span className='long'>{long} </span>
        </div>


      </div>
      <div className='data'>
        <div className="element">
          <img src={humidityicon} width='50px' height='50px'/>
          <h5>{humidity}%</h5>
           <h5>Humidity</h5>
        </div>
       
        <div className="element">
          <img src={windicon} width='50px'  height='50px'/>
          <h5>{wind}%</h5>
           <h5>wind  speed</h5>
        </div>

      </div>
      
      
     
    </>

  )
}

function App() {
  let api_key="24243f81ef9ffbd84a0cc13ccd9d70d2";

  const [text,setText] = useState("bangalore")
  const [icon, setIcon] = useState(snowicon)
  const [temp, setTemp] = useState(0)
  const [city, setCity] = useState('bangalore')
  const [country, setCountry] = useState('India')
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [humidity,setHumidity]=useState(0)
  const [wind,setWind]=useState(0)

  const [citynotfound,setCitynotfound]=useState(false)
  const [loading,setLoading]= useState(false)
  const [error,setError] = useState(null)


  const weatherIcon={
    "01d":clearicon,
    "01n":clearicon,
    "02d":cloudyicon,
    "02n":cloudyicon,
    "03d":drizzleicon,
    "03n":drizzleicon,
    "04d":drizzleicon,
    "04n":drizzleicon,
    "09d":rainyicon,
    "09n":rainyicon,
    "10d":rainyicon,
    "10n":rainyicon,
    "13d":snowicon,
    "13n":snowicon

  }

/*const search= async() => {
  
 let url=`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`;
  
    try{
      let result = await fetch(url);
      let data = await result.json();
      console.log(data)
    }
   catch(e){
    console.log(e)
    console.log(e.message);
   }
   finally{
    setLoading(false);
   }
};*/

const search = async()=>{
  try{
    let url= await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${api_key}&units=Metric`)
    console.log(url.data)
    if (url.data.cod==="404"){
      console.error("city not found");
      setCitynotfound(true);
      setLoading(false);
      return;
    }
    setHumidity(url.data.main.humidity)
    setWind(url.data.wind.speed)
    setTemp(url.data.main.temp)
    setLat(url.data.coord.lat)
    setLong(url.data.coord.lon)
    setCity(url.data.name)
    setCountry(url.data.sys.country)
    const weatherIconCode=url.data.weather[0].icon;
    setIcon(weatherIcon[weatherIconCode] || clearicon)
    setCitynotfound(false)
   
  }
  catch(error){
    console.error("An error occured",error.message);
    setError("An error occur while fetching weather data")
  }
  finally{
    setLoading(false)
  }
}
const handleKey=(e)=>{
  if (e.key==="Enter"){
    search();
  }

};
useEffect(function(){
  search();
},[])

  return (
    <div >
      <h1>WEATHER APP</h1>
      <div className='container'>
        <div className='input-container'>
          <input type='text' placeholder='serach city' className='city'  value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={handleKey}/>
          <div className='serach-icon'  onClick={()=>search()}>
            <img src={searchicon} width='20px' alt='error' />
          </div>
        </div>

        { !loading  && !citynotfound && <Weather icon={icon} temp={temp} city={city} country={country} lat={lat} 
        long={long} humidity={humidity}  wind={wind}  />}
         {loading && <div className='loading-msg'>
          Loading...
         </div>}
          {error &&<div className='error-msg'>
          {error}
         </div>}
         {citynotfound && <div className="city-not-found">City not found</div>}
      </div>

    </div>

  );
}

export default App;
