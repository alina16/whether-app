import { FAVORITE_LOCATIONS, ILocation, IWeather } from '../../features/weather/weatherSlice';
import cx from 'classnames';
import { getIconSrc } from '../../utils';
import './styles.scss';

interface ILocationList {
    current: ILocation, 
    weather: IWeather[],
    onClick: (id: number) => void;
}

export const LocationList = ({ current, weather, onClick }: ILocationList) => {
    return (
        <ul className="list-group">
            { FAVORITE_LOCATIONS.map(({ city, country, id }) =>  {
                const currWeather = weather[id];
                const isDisaled = typeof currWeather === 'string';

                return (
                    <li 
                        onClick={() => onClick(id)}
                        key={id}
                        className={cx(
                            'list-group-item fw-normal rounded-0 text-secondary',
                            { disabled: isDisaled, 'bg-primary': current.city === city },
                        )} 
                        aria-disabled={isDisaled}
                    >   
                        {weather[id]?.current && <img src={getIconSrc(weather[id].current?.weather[0].main)} />}
                        { isDisaled ? '' :  `${city}, ${country}`}
                    </li>);
            })}
        </ul>
    )
}