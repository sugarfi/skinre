import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/calendar.sass';

export const Calendar = (props) => {
    const toGoodDow = (dow) => [ 6, 0, 1, 2, 3, 4, 5 ][dow];

    const today = new Date();

    const total = new Date(today.getYear(), today.getMonth() + 1, 0).getDate();

    const first = today;
    first.setDate(1);
    const first_dow = toGoodDow(first.getDay());

    const days = [ 
        new Array(first_dow).fill(-1), 
        Array.from(new Array(total), (_, i) => i), 
        new Array(35 - total).fill(-1) 
    ].flat();

    const rows = [];

    let i;
    for (i = 0; i < 35; i += 7) {
        rows.push(
            <tr>
                {
                    days.slice(i, i + 7)
                    .map(i => 
                        (i == -1) ?
                            <td className={ styles.invalid }></td>
                        :
                            <td>
                                <span className={ styles.topLeft }>{ i + 1 }</span>
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
                <tr>
                    <th>mon</th>
                    <th>tue</th>
                    <th>wed</th>
                    <th>thu</th>
                    <th>fri</th>
                    <th>sat</th>
                    <th>sun</th>
                </tr>
                { rows }
            </table>
        </>
    );
};

