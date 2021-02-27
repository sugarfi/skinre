import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/tablist.scss';

export const TabList = ({ tabs, ...props }) => {
    const [ page, setPage ] = React.useState(Object.values(tabs)[0]);
    return (
        <>
            <nav>
                {
                    Object.keys(tabs).map(key =>
                        <a onClick={ () => setPage(tabs[key]) } key={key}>{key}</a>
                    )
                }
            </nav>
            { page }
        </>
    );
};
