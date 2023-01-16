import './styles.scss';
import cx from "classnames";

interface IHeader {
    title: string, 
    isMobileCenter?: boolean,
}

export const Header = ({ title, isMobileCenter = false }: IHeader) => {
    return (
        <div className={cx(
            'header text-lg-start p-3 opacity-75 border-bottom border-dark-subtle', 
            { 'text-center text-sm-center': isMobileCenter },
        )}>
            <strong>{title}</strong>
        </div>
    );
}