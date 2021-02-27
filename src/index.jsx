import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './logo.png';
import './index.sass';

const App = (props) => {
    return (
        <>
            <header>
                <img src={Logo} />
                <h1>Skinre</h1>
            </header>
        </>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
