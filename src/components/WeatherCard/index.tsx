import { OPTIONS } from "../../features/weather/Weather";
import cx from "classnames";
import { ICurrent, IWeather } from "../../features/weather/weatherSlice";
import { getIconSrc } from "../../utils";
import './styles.scss';

interface IWeatherCard {
    weather: IWeather | ICurrent,
    units: OPTIONS,
    isDaily?: boolean,
}

export const WeatherCard = (params: IWeatherCard) => {
    const { weather, units, isDaily = false } = params;
    const currWeather: any = weather.current ? weather.current.weather : weather.weather;
    const main = currWeather ? currWeather[0].main : '';
    const temp = weather.current?.temp || typeof weather.temp !== 'number' && weather.temp?.day || 0;

    return (
        <>
            <div className="card mb-3 border-0">
                <div className="row g-0">
                    <div className={cx(
                        'p-3 col-xs-12 text-center text-lg-start text-sm-center', 
                        { 'col-lg-3': !isDaily, 'col-md-12': isDaily },
                    )}>
                        <img src={getIconSrc(main)} className="img-fluid rounded-start" alt="..." />
                    </div>
                    <div className={cx(
                        'card-body-wrapper col-xs-12 text-center text-sm-center text-lg-start', 
                        { 'col-lg-8': !isDaily, 'col-md-12': isDaily },
                    )}>
                        <div className={cx('card-body', { 'p-1': isDaily })}>
                            {typeof temp === 'number' && 
                                <p className={cx('text-muted', { 'fs-1': !isDaily, 'text-center': isDaily })}>
                                    {`${Math.ceil(temp)}${units}`}
                                </p>}
                            <p className="card-text fs-4 text-secondary text-capitalize">
                                {currWeather && !isDaily ? currWeather[0].description : ''}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row daily">
                { weather.daily && weather.daily.map((item) =>
                    <div className="col" key={item.dt}>
                        <WeatherCard units={units} isDaily={true} weather={item} />
                    </div>
                )}
            </div>
        </>
    );
}