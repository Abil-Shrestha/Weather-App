import './App.css';
import Inputs from './components/Inputs';
import TempAndDetail from './components/TempAndDetail';
import TimeAndLocation from './components/TimeAndLocation';
import TopButton from './components/TopButton';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  
  const [query, setQuery] = useState({q: 'berlin'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    const fetchWeather = async () =>{
      const message = query.q ? query.q : 'current location.'

      toast.info('Fetching weather for ' + message,{hideProgressBar: true})

      await getFormattedWeatherData({...query, units}).then(
        (data) => {

          toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`,{hideProgressBar: true,})
          
          setWeather(data);
        });
      
    }
  
    fetchWeather();
  }, [query, units])
  
  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700';
    const threshold = units === 'metric' ? 30: 86 ;
    if(weather.temp <= threshold) return 'from-cyan-400 to-blue-800'

    return 'from-yellow-300 to-red-900'

  }
  
  return (
    <div className=" bg-gradient-to-r from-sky-400 to-indigo-600 ">
      <div className={`mx-auto max-w-screen-md  py-5 px-32 bg-gradient-to-br h-fit shadow-xl shadow-grey-400 ${formatBackground()} `}>
        <TopButton setQuery={setQuery}/>
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
        {weather && (
         <div>
          <TimeAndLocation weather ={weather}/>
          <TempAndDetail weather ={weather}/>

          <Forecast title="hourly forecast" items={weather.hourly}/>
          <Forecast title="daily forecast" items={weather.daily}/>
        </div>
        )}
        
        <ToastContainer  autoClose={500} theme ='light' newestOnTop={true} />

      </div>
    </div>
    
    
  );
}

export default App;
