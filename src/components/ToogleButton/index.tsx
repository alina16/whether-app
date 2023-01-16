import cx from 'classnames';
import './styles.scss';

type ToogleButtonProps = {
    options?: string[],
    handleClick: () => void,
    valueIndex?: number,
}

enum OPTIONS {
    ON = 'on',
    OFF = 'off',
}

export const ToogleButton = ({ 
    options = [OPTIONS.OFF, OPTIONS.ON],
    handleClick,
    valueIndex = 1, 
}: ToogleButtonProps) => (
    <button onClick={handleClick} className='toggle-btn rounded-pill p-0'>
        {
            options.map(option => {
                const isActive = option === options[valueIndex];
                const positionSide = valueIndex === 0 ? 'left' : 'right'

                return (<span 
                    className={cx({ active: isActive, [positionSide]: isActive })} 
                    key={option}
                >
                    {option}
                </span>
            )})
        }
    </button>
);
