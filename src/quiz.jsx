import React from 'react';
import ReactDOM from 'react-dom';
import styles from './styles/tablist.scss';

export const Quiz = (props) => {
    const [ done, setDone ] = React.useState(false);

    React.useEffect(() => {
        chrome.storage.sync.get({ scores: {} }, ({ scores }) => {
            const today = new Date().getDate();
            const this_month = new Date().getMonth();
            const s_this_month = scores[this_month] || {};
            if (s_this_month[today]) {
                setDone(true);
            }
        });
    }, []);

    const questions = [
        {
            text: 'How many times today have you washed your skin?',
            answers: [
                {
                    text: '0 times',
                    red: 1
                },
                {
                    text: '1 or 2 times in the morning and at night',
                    yellow: 1
                },
                {
                    text: '2 times in the morning and at night',
                    green: 1
                }
            ]
        },
        {
            text: 'How long did you bathe for today?',
            answers: [
                {
                    text: '20-30 minutes',
                    red: 1
                },
                {
                    text: '10-20 minutes',
                    yellow: 1
                },
                {
                    text: '5-10 minutes',
                    green: 1
                }

            ]
        },
        {
            text: 'If you have pimples, did you pop them?',
            answers: [
                {
                    text: 'Yes',
                    red: 1
                },
                {
                    text: 'Only a few',
                    yellow: 1
                },
                {
                    text: 'I don\'t have pimples',
                    green: 1
                }
            ]
        },
        {
            text: 'How much water did you drink today?',
            answers: [
                {
                    text: 'None',
                    red: 1
                },
                {
                    text: '0.7-1.7 liters',
                    yellow: 1
                },
                {
                    text: '2.7-3.7 liters',
                    green: 1
                }
            ]
        },
        {
            text: 'How stressed would you say you are today?',
            answers: [
                {
                    text: 'Very stressed',
                    red: 1
                },
                {
                    text: 'A bit stressed',
                    yellow: 1
                },
                {
                    text: 'Not stressed',
                    green: 1
                }
            ]
        },
    ];

    const [ red, setRed ] = React.useState(0);
    const [ yellow, setYellow ] = React.useState(0);
    const [ green, setGreen ] = React.useState(0);
    
    return (
        <>
            <h1>Quiz</h1>
            {
                done ?
                <p className={ styles.msg }>You have already taken the quiz today!</p> :
                <>
                    <ul>
                        {
                            questions.map(q =>
                                <li key={ q.text }>
                                    { q.text }
                                    {
                                        q.answers.map(ans =>
                                            <button onClick={() => {
                                                setRed(red + ans.red || 0);
                                                setYellow(yellow + ans.yellow || 0);
                                                setGreen(green + ans.green || 0);
                                            }}>{ ans.text }</button>
                                        )
                                    }
                                </li>
                            )
                        }
                    </ul>
                    <button onClick={() => {
                        const val = Math.max(red, yellow, green);
                        const today = new Date().getDate();
                        const this_month = new Date().getMonth();
                        const for_today = val == red ? 'red' : val == yellow ? 'yellow' : val == green ? 'green' : 'yellow';
                        chrome.storage.sync.get({ scores: {} }, ({ scores }) => {
                            const days = { ...scores, [this_month]: { ...scores[this_month], [today]: for_today } };
                            console.log(days);
                            chrome.storage.sync.set({ scores: days });
                        });
                    }}>Submit</button>
                </>
            }
        </>
    );
};
