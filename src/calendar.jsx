import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/calendar.scss';

export const Calendar = (props) => {
    const [ scores, setScores ] = React.useState({});

    React.useEffect(() => {
        chrome.storage.sync.get({ scores: {} }, ({ scores }) => {
            setScores(scores);
        });
    }, []);

    const toGoodDow = (dow) => [ 6, 0, 1, 2, 3, 4, 5 ][dow];

    const today = new Date();
    const month = scores[today.getMonth()] || {};
    console.log(month);

    const total = new Date(today.getYear(), today.getMonth() + 1, 0).getDate();

    const first = today;
    first.setDate(1);
    const first_dow = toGoodDow(first.getDay());

    const days = [ 
        new Array(first_dow).fill(-1), 
        Array.from(new Array(total), (_, i) => i), 
        new Array(35 - total).fill(-1) 
    ].flat();

    const classNames = {
        'red': styles.red,
        'yellow': styles.yellow,
        'green': styles.green,
        'none': ''
    };

    const rows = [];
    let i;
    for (i = 0; i < 35; i += 7) {
       rows.push( 
            <tr>
                {
                    days.slice(i, i + 7)
                    .map((i, idx) => 
                        (i == -1) ?
                            <td className={ styles.invalid } key={ idx }></td>
                        :
                            <td className={ classNames[month[i + 1] || 'none'] } key={ idx }>
                                <span className={ styles.topLeft }>
                                    { i + 1 }
                                </span>
                            </td>
                    )
                }
            </tr>
        );
    }

    return (
        <>
            <h1>Calendar</h1>
            <table>
                <thead>
                    <tr>
                        <th>mon</th>
                        <th>tue</th>
                        <th>wed</th>
                        <th>thu</th>
                        <th>fri</th>
                        <th>sat</th>
                        <th>sun</th>
                    </tr>
                </thead>
                <tbody>
                    { rows }
                </tbody>
            </table>
        </>
    );
};

