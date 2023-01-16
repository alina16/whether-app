import PartlyCloudy from '../assets/images/PartlyCloudy.svg';
import Rainy from '../assets/images/Rainy.svg';
import Snowy from '../assets/images/Snowy.svg';
import Sunny from '../assets/images/Sunny.svg';

const weatherCondition: any = {
    Clouds: PartlyCloudy,
    Rain: Rainy,
    Snow: Snowy,
    Clear: Sunny,
    Fog: PartlyCloudy,
}

export const getIconSrc = (main = 'Clouds') => {
    return weatherCondition[main]; 
}
