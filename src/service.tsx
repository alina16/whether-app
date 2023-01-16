import axios from "axios";

const http = axios.create({
  baseURL: "https://api.openweathermap.org/data/3.0",
  headers: {
    "Content-type": "application/json"
  }
});

export type Params = {
    lat: number,
    lon: number,
    appid: string,
    exclude?: string,
    units?: string,
    lang?: string,
  }
  
  const Service = {
      getWeather: (params: Params) => {
          return http.get('/onecall', { params });
      }, 
  };
    
export default Service;