// import React, { useState, useEffect } from 'react';

// const WeatherWidget = () => {
//   const [city, setCity] = useState('Nairobi');
//   const [input, setInput] = useState('Nairobi');
//   const [weather, setWeather] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const API_KEY = 'b926c1ac0a3109755407b41d911b36fc'; // Replace with your key

//   useEffect(() => {
//     const fetchWeather = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await fetch(
//           `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
//         );
//         if (!response.ok) throw new Error('City not found');
        
//         const data = await response.json();
        
//         // Data Destructuring for clean state storage
//         setWeather({
//           temp: data.main.temp,
//           humidity: data.main.humidity,
//           description: data.weather[0].description,
//           name: data.name
//         });
//       } catch (err) {
//         setError(err.message);
//         setWeather(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchWeather();
//   }, [city]);

//   return (
//     <div className="max-w-sm mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4">
//       <h2 className="text-xl font-bold text-gray-800">Zindua Weather</h2>
//       <div className="flex space-x-2">
//         <input 
//           className="border p-2 rounded w-full"
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//         />
//         <button 
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           onClick={() => setCity(input)}
//         >
//           Search
//         </button>
//       </div>

//       {loading && <p>Loading...</p>}
//       {error && <p className="text-red-500">{error}</p>}
      
//       {weather && !loading && (
//         <div className="p-4 bg-gray-50 rounded-lg">
//           <h3 className="text-2xl font-semibold">{weather.name}</h3>
//           <p className="text-4xl">{Math.round(weather.temp)}°C</p>
//           <p className="capitalize text-gray-600">{weather.description}</p>
//           <p className="text-sm">Humidity: {weather.humidity}%</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WeatherWidget;

import React, { useState, useEffect } from 'react';
// Added LuCloudRain to imports
import { LuThermometer, LuDroplets, LuWind, LuGauge, LuEye, LuSearch, LuCloudRain } from 'react-icons/lu';

const WeatherWidget = () => {
  const [city, setCity] = useState('Nairobi');
  const [input, setInput] = useState('Nairobi');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

//   const API_KEY = 'b926c1ac0a3109755407b41d911b36fc';
  const API_KEY = import.meta.env.VITE_API_KEY

  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        if (!response.ok) throw new Error('City not found');
        
        const data = await response.json();
        
        const {
          main: { temp, humidity, pressure },
          weather: [weatherDetails],
          wind: { speed: windSpeed },
          visibility,
          name,
          rain // Destructuring potential rain data
        } = data;

        setWeather({
          temp,
          humidity,
          pressure,
          description: weatherDetails.description,
          icon: weatherDetails.icon,
          windSpeed,
          visibility: visibility / 1000,
          name,
          rainVolume: rain ? rain['1h'] : 0 // Fallback to 0 if no rain
        });
      } catch (err) {
        setError(err.message);
        setWeather(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  return (
    <div className="max-w-sm mx-auto p-6 bg-white rounded-2xl shadow-xl border border-gray-100">
      <div className="flex gap-2 mb-6">
        <input 
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter city..."
        />
        <button className="bg-blue-600 text-white p-2 rounded-lg" onClick={() => setCity(input)}>
          <LuSearch size={20} />
        </button>
      </div>

      {loading && <p className="text-center text-gray-500">Updating...</p>}
      {error && <p className="text-center text-red-500 font-medium">{error}</p>}
      
      {weather && !loading && (
        <div className="space-y-4">
          <div className="text-center flex flex-col items-center">
            <h2 className="text-2xl font-bold">{weather.name}</h2>
            {/* Added Thermometer icon next to temperature */}
            <div className="flex items-center gap-2 mt-2">
              <LuThermometer className="text-orange-500" size={32} />
              <p className="text-5xl font-light">{Math.round(weather.temp)}°C</p>
            </div>
            <p className="text-gray-500 capitalize">{weather.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t">
            <WeatherStat icon={<LuDroplets className="text-blue-500"/>} label="Humidity" value={`${weather.humidity}%`} />
            <WeatherStat icon={<LuWind className="text-sky-500"/>} label="Wind" value={`${weather.windSpeed} m/s`} />
            <WeatherStat icon={<LuGauge className="text-purple-500"/>} label="Pressure" value={`${weather.pressure} hPa`} />
            {/* Added Rain volume stat */}
            <WeatherStat icon={<LuCloudRain className="text-indigo-500"/>} label="Rain (1h)" value={`${weather.rainVolume} mm`} />
          </div>
        </div>
      )}
    </div>
  );
};

const WeatherStat = ({ icon, label, value }) => (
  <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
    {icon}
    <div>
      <p className="text-[10px] text-gray-400 uppercase">{label}</p>
      <p className="text-sm font-semibold">{value}</p>
    </div>
  </div>
);

export default WeatherWidget;