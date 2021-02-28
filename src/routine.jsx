import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/routine.scss';

export const Routine = (props) => {
    const [ value, setValue ] = React.useState('');
    
    React.useEffect(() => {
        chrome.storage.sync.get({ routine: '' }, ({ routine }) => {
            setValue(routine);
        });
    }, []);

    return (
        <>
            <h1>Routine</h1>
            <textarea onChange={(e) => {
                setValue(e.target.value);
                chrome.storage.sync.set({ routine: e.target.value });
            }} value={ value } rows="15" cols="40" placeholder="Type here..."></textarea>
        </>
    );
};
