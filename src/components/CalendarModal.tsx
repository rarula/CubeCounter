import { useEffect, useState } from 'react';

import { LeftArrowSvg, RightArrowSvg } from './Svg';
import { useGameState } from '../contexts/GameState';
import { getDaysInMonth, mod } from '../core/utils';

type Props = {
    closeCalendar: () => void;
    isOpened: boolean;
};

type Calendar = {
    isThisMonth: boolean;
    value: number;
    day: number;
}[];

const NAMED_MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const WrappedArrow = (props: { direction: 'L' | 'R'; onClick: () => void }): JSX.Element => {
    if (props.direction === 'L') {
        return (
            <div className='svg-arrow' onClick={props.onClick}>
                <LeftArrowSvg />
            </div>
        );
    } else {
        return (
            <div className='svg-arrow' onClick={props.onClick}>
                <RightArrowSvg />
            </div>
        );
    }
};

const CalendarModal = (props: Props): JSX.Element => {
    const getCalendar = (y: number, m: number): Calendar => {
        const calendar: Calendar = [];

        const days = getDaysInMonth(y, m);
        const prevDays = getDaysInMonth(y, m - 1);

        const firstDay = new Date(y, m, 1).getDay();
        const lastDay = new Date(y, m, days).getDay();

        if (0 < firstDay) {
            for (let i = 0; i < firstDay; i++) {
                calendar.push({
                    isThisMonth: false,
                    value: prevDays - firstDay + 1 + i,
                    day: i,
                });
            }
        }
        for (let i = 0; i < days; i++) {
            calendar.push({
                isThisMonth: true,
                value: i + 1,
                day: (i + firstDay) % 7,
            });
        }
        if (lastDay < 6) {
            for (let i = 0; i < 6 - lastDay; i++) {
                calendar.push({
                    isThisMonth: false,
                    value: i + 1,
                    day: i + 1 + lastDay,
                });
            }
        }

        return calendar;
    };

    const state = useGameState();
    const currentDate = new Date(state.date);

    const [year, setYear] = useState(currentDate.getFullYear());
    const [month, setMonth] = useState(currentDate.getMonth());
    const [date, setDate] = useState(currentDate.getDate());

    const calendar = getCalendar(year, month);
    const selectedDate = new Date(year, month, date);

    const closeCalendar = (): void => {
        props.closeCalendar();
    };

    const applyCalendar = (): void => {
        state.changeDate(new Date(year, month, date).getTime());
        props.closeCalendar();
    };

    useEffect(() => {
        if (props.isOpened) {
            setYear(currentDate.getFullYear());
            setMonth(currentDate.getMonth());
            setDate(currentDate.getDate());
        }
    }, [props.isOpened]);

    return (
        <div className='modal'>
            <div className='modal-background' onClick={closeCalendar} />
            <div className='calendar-modal'>
                <div className='calendar'>
                    <div className='calendar-header'>
                        <div className='calendar-date-selector'>
                            <WrappedArrow direction='L' onClick={() => setMonth((prev) => mod(prev - 1, 12))} />
                            <span>{NAMED_MONTH[month]}</span>
                            <WrappedArrow direction='R' onClick={() => setMonth((prev) => mod(prev + 1, 12))} />
                        </div>
                        <div className='calendar-date-selector'>
                            <WrappedArrow direction='L' onClick={() => setYear((prev) => prev - 1)} />
                            <span>{year}</span>
                            <WrappedArrow direction='R' onClick={() => setYear((prev) => prev + 1)} />
                        </div>
                    </div>
                    <div className='calendar-body'>
                        <div className='calendar-days'>
                            <span>S</span>
                            <span>M</span>
                            <span>T</span>
                            <span>W</span>
                            <span>T</span>
                            <span>F</span>
                            <span>S</span>
                        </div>
                        <div className='calendar-dates'>
                            {calendar.map((date, index) =>
                                date.isThisMonth ? (
                                    <div
                                        key={index}
                                        className={
                                            'calendar-date calendar-date-enabled' +
                                            (date.day === 0 ? ' calendar-date-sunday' : '') +
                                            (date.day === 6 ? ' calendar-date-saturday' : '')
                                        }
                                        onClick={() => setDate(date.value)}
                                    >
                                        <div className={date.value === selectedDate.getDate() ? 'calendar-date-selected' : ''}>
                                            <span>{date.value}</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        key={index}
                                        className={
                                            'calendar-date calendar-date-disabled' +
                                            (date.day === 0 ? ' calendar-date-sunday' : '') +
                                            (date.day === 6 ? ' calendar-date-saturday' : '')
                                        }
                                    >
                                        <div>
                                            <span>{date.value}</span>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    </div>
                    <div className='calendar-footer'>
                        <div className='calendar-footer-button calendar-footer-button-secondary' onClick={closeCalendar}>
                            <span>Back</span>
                        </div>
                        <div className='calendar-footer-button calendar-footer-button-primary' onClick={applyCalendar}>
                            <span>Apply</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarModal;
