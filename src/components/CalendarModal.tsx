import { useEffect, useState } from 'react';

import { LeftArrowSvg, RightArrowSvg } from './Svg';
import { useGameState } from '../contexts/GameState';
import { getDaysInMonth, mod } from '../core/utils';
import { Calendar } from '../core/types';

type Props = {
    closeCalendar: () => void;
    isOpened: boolean;
};

const NAMED_MONTH = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const WrappedArrow = (props: { direction: 'L' | 'R'; onClick: () => void }): JSX.Element => {
    return (
        <div className='svg-arrow' onClick={props.onClick}>
            {props.direction === 'L' ? <LeftArrowSvg /> : <RightArrowSvg />}
        </div>
    );
};

const CalendarModal = (props: Props): JSX.Element => {
    const getCalendar = (y: number, m: number): Calendar => {
        const calendar: Calendar = [];

        const prevDate = new Date(y, m, 0);
        const currDate = new Date(y, m, 1);
        const nextDate = new Date(y, m + 1, 1);

        const currentDays = getDaysInMonth(y, m);
        const firstDay = currDate.getDay();
        const lastDay = (firstDay - 1 + currentDays) % 7;

        // 先月分のカレンダー
        if (0 < firstDay) {
            for (let i = 0; i < firstDay; i++) {
                calendar.push({
                    year: prevDate.getFullYear(),
                    month: prevDate.getMonth(),
                    date: prevDate.getDate() - firstDay + i + 1,
                    day: i,
                    isThisMonth: false,
                });
            }
        }

        // 今月分のカレンダー
        for (let i = 0; i < currentDays; i++) {
            calendar.push({
                year: currDate.getFullYear(),
                month: currDate.getMonth(),
                date: i + 1,
                day: (firstDay + i) % 7,
                isThisMonth: true,
            });
        }

        // 来月分のカレンダー
        if (lastDay < 6) {
            for (let i = 0; i < 6 - lastDay; i++) {
                calendar.push({
                    year: nextDate.getFullYear(),
                    month: nextDate.getMonth(),
                    date: i + 1,
                    day: lastDay + i + 1,
                    isThisMonth: false,
                });
            }
        }

        return calendar;
    };

    const state = useGameState();

    const currentDate = new Date();
    const stateDate = new Date(state.date);

    const year = stateDate.getFullYear();
    const month = stateDate.getMonth();
    const date = stateDate.getDate();

    const [selectedYear, setSelectedYear] = useState(year);
    const [selectedMonth, setSelectedMonth] = useState(month);
    const [selectedDate, setSelectedDate] = useState(date);

    const [displayYear, setDisplayYear] = useState(year);
    const [displayMonth, setDisplayMonth] = useState(month);

    const calendar = getCalendar(displayYear, displayMonth);

    const selectDate = (date: number): void => {
        setSelectedYear(displayYear);
        setSelectedMonth(displayMonth);
        setSelectedDate(date);
    };

    const closeCalendar = (): void => {
        props.closeCalendar();
    };

    const applyCalendar = (): void => {
        state.changeDate(new Date(selectedYear, selectedMonth, selectedDate).getTime());
        props.closeCalendar();
    };

    useEffect(() => {
        if (props.isOpened) {
            setSelectedYear(year);
            setSelectedMonth(month);
            setSelectedDate(date);
            setDisplayYear(year);
            setDisplayMonth(month);
        }
    }, [props.isOpened]);

    return (
        <>
            <div className='modal-background' onClick={closeCalendar} />
            <div className='modal calendar'>
                <div className='cld-header'>
                    <div className='cld-date-selector'>
                        <WrappedArrow direction='L' onClick={() => setDisplayMonth((prev) => mod(prev - 1, 12))} />
                        <span>{NAMED_MONTH[displayMonth]}</span>
                        <WrappedArrow direction='R' onClick={() => setDisplayMonth((prev) => mod(prev + 1, 12))} />
                    </div>
                    <div className='cld-date-selector'>
                        <WrappedArrow direction='L' onClick={() => setDisplayYear((prev) => prev - 1)} />
                        <span>{displayYear}</span>
                        <WrappedArrow direction='R' onClick={() => setDisplayYear((prev) => prev + 1)} />
                    </div>
                </div>
                <div className='cld-body'>
                    <div className='cld-days'>
                        <span className='cld-day-0'>S</span>
                        <span className='cld-day-1'>M</span>
                        <span className='cld-day-2'>T</span>
                        <span className='cld-day-3'>W</span>
                        <span className='cld-day-4'>T</span>
                        <span className='cld-day-5'>F</span>
                        <span className='cld-day-6'>S</span>
                    </div>
                    <div className='cld-dates'>
                        {calendar.map((date, index) =>
                            date.isThisMonth &&
                            (date.year < currentDate.getFullYear() ||
                                (date.year === currentDate.getFullYear() && date.month < currentDate.getMonth()) ||
                                (date.year === currentDate.getFullYear() && date.month === currentDate.getMonth() && date.date <= currentDate.getDate())) ? (
                                <div key={index} className={`cld-date cld-day-${date.day}`} onClick={() => selectDate(date.date)}>
                                    {date.year === selectedYear && date.month === selectedMonth && date.date === selectedDate ? (
                                        <div className='selected'>
                                            <span>{date.date}</span>
                                        </div>
                                    ) : (
                                        <div>
                                            <span>{date.date}</span>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div key={index} className={`cld-date cld-day-${date.day} disabled`}>
                                    <div>
                                        <span>{date.date}</span>
                                    </div>
                                </div>
                            ),
                        )}
                    </div>
                </div>
                <div className='cld-footer'>
                    <div className='cld-footer-button secondary' onClick={closeCalendar}>
                        <span>Back</span>
                    </div>
                    <div className='cld-footer-button primary' onClick={applyCalendar}>
                        <span>Apply</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CalendarModal;
