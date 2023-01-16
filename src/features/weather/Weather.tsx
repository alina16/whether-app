import { useState, useEffect } from 'react';
import { ToogleButton } from '../../components/ToogleButton';
import { FAVORITE_LOCATIONS, getWeather, selectWeather } from './weatherSlice';
import { store } from '../../app/store';
import { Spinner } from '../../components/Spinner';
import { Header } from '../../components/Header';
import { LocationList } from '../../components/LocationsList';
import { WeatherCard } from '../../components/WeatherCard';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import './styles.scss';

export type AppDispatch = typeof store.dispatch
export enum OPTIONS {
    C = '\u2103',
    F = '\u2109',
}
const toggleOptions = [OPTIONS.F, OPTIONS.C]

export const Weather = () => {
    const dispatch = useAppDispatch();
    const [units, setUnits] = useState(OPTIONS.C);
    const [location, setLocation] = useState(FAVORITE_LOCATIONS[0]);
    const toogleValIndex = units === OPTIONS.C ? 1 : 0;
    const weather = useAppSelector(selectWeather);

    useEffect(() => {
        dispatch(getWeather(units));
    }, [units]);

    const handleToggle = () =>
        setUnits(units === OPTIONS.C ? OPTIONS.F : OPTIONS.C);

    const handleSetLocation = (id: number) => {
        setLocation(FAVORITE_LOCATIONS[id]);
    }

    return (
        <div className='weather-container bg-opacity-25 bg-secondary min-vh-100'>
            <header className='bg-white'>
                <div className='container'>
                    <div className='row p-3'>
                        <div className='col'>
                            <p className='text-start fw-bold m-0'>Weather</p>
                        </div>
                        <div className='col text-end'>
                            <ToogleButton valueIndex={toogleValIndex} options={toggleOptions} handleClick={handleToggle} />
                        </div>
                    </div>
                </div>
            </header>
            <div className='container full-height'>
                <div className='row h-100 mt-3 mb-3'>
                    <div className='col-12 p-0 rounded col-lg-3 bg-white'>
                        <Header title='Favourite Locations' />
                        {weather.length ? 
                            <LocationList onClick={handleSetLocation} current={location} weather={weather} /> : 
                            <Spinner />
                        }
                    </div>
                    <div className='col-12 rounded p-0 offset-lg-1 col-lg-8 order-first order-lg-last bg-white'>
                        <Header isMobileCenter={true} title={`${location.city}, ${location.province}`} />
                        {weather.length ? 
                            <WeatherCard units={units} weather={weather[location.id]} /> :
                             <Spinner />}
                    </div>
                </div>
            </div>
        </div>
    )
}