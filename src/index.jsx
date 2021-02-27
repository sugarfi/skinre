import React from 'react';
import ReactDOM from 'react-dom';

import { TabList } from './tablist.jsx';
import { Quiz } from './quiz.jsx';
import { Calendar } from './calendar.jsx';

import Logo from './logo.png';
import './styles/index.scss';

const App = (props) => {
    return (
        <>
            <header>
                <img src={Logo} />
            </header>
            <TabList tabs={
                {
                    'Quiz': <Quiz />,
                    'Calendar': <Calendar />
                }
            }/>
        </>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
