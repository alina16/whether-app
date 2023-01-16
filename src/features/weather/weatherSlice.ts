import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import Service from '../../service';
import { OPTIONS } from './Weather';

export interface ILocation {
  lat: number,
  lon: number,
  city?: string,
  country?: string,
  province?: string,
  id: number,
}

export const FAVORITE_LOCATIONS: ILocation[] = [
  {
    id: 0,
    city: 'Ottawa',
    lat: 45.4112,
    lon: -75.6981,
    country: 'Canada',
    province: 'ON',
  },
  {
    id: 1,
    city: 'Toronto',
    lat: 43.7001,
    lon: -79.4163,
    country: 'Canada',
    province: 'ON',
  },
  {
    id: 2,
    city: 'Vancouver',
    lat: 49.2497,
    lon: -123.11,
    country: 'Canada',
    province: 'BC',
  },
  {
    id: 3,
    city: 'New York',
    lat: 43.0004,
    lon: -75.4999,
    country: 'USA',
    province: 'NYS',
  },
  {
    id: 4,
    city: 'London',
    lat: 51.5085,
    lon: -0.1257,
    country: 'UK',
    province: '',
  }
]

export interface IError {
  type: string,
  message: string,
}

export interface ICurrentWeather {
  id: number,
  main: string,
  description: string,
}

export interface ITemp {
  day: number,
  morn?: number,
  night: number,
}

export interface ICurrent {
  dt?: number,
  temp: number | ITemp,
  feels_like: number,
  pressure: number,
  humidity: number,
  clouds: number,
  visibility: number,
  wind_speed: number,
  weather: ICurrentWeather[],
  current?: ICurrent,
  daily?: ICurrent[],
}

export interface IAlert {
  sender_name: string,
  event: string,
  description: string,
}

export interface IWeather extends ILocation {
  timezone?: string,
  current?: ICurrent,
  daily: ICurrent[],
  alerts?: IAlert[],
  error?: string,
  weather?: ICurrent,
  temp?: number,
}

export interface IWeatherState {
  loading: boolean,
  error: IError | null,
  weather: IWeather[],
}

const initialState: IWeatherState = {
  loading: false,
  error: null,
  weather: [],
};

export const getWeather = createAsyncThunk(
  'weather/getWeather',
  async (units: OPTIONS) => {
    const appid: string = process.env.REACT_APP_API_KEY || '';
    const requests = FAVORITE_LOCATIONS.map(({ lat, lon }) =>
      Service.getWeather({ lat, lon, appid, units: units === OPTIONS.C ? 'metric' : 'imperial' }));
    const response = await Promise.allSettled(requests);
      
    return response.map(item => item.status === 'fulfilled' ? item.value.data : item.reason.message);
  }
);

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;

      })
      .addCase(getWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as IError | null;
      });
  },
});

export const selectLoading = (state: RootState) => state.weather.loading;
export const selectError = (state: RootState) => state.weather.error;
export const selectWeather = (state: RootState) => state.weather.weather;

export default weatherSlice.reducer;
