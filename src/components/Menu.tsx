import { useState } from 'react';

import CalendarModal from './CalendarModal';
import Fade from './Fade';
import { CalendarSvg } from './Svg';
import { useGameState } from '../contexts/GameState';

const Menu = (): JSX.Element => {
    const state = useGameState();
    const currentDate = new Date(state.date);

    const [isOpened, setOpened] = useState(false);

    const openCalendar = (): void => {
        setOpened(true);
    };

    const closeCalendar = (): void => {
        setOpened(false);
    };

    const handleClick = (): void => {
        state.setPlaying(true);
    };

    return (
        <>
            <div className='menu-container'>
                <div className='menu'>
                    <h1>かぞえてブロック</h1>
                    <h3>{`${currentDate.getFullYear()} / ${(currentDate.getMonth() + 1).toString().padStart(2, '0')} / ${currentDate.getDate().toString().padStart(2, '0')}`}</h3>
                    <div className='menu-panel'>
                        <div className='menu-panel-horizontal'>
                            <div className='button icon-button calendar-button' onClick={openCalendar}>
                                <CalendarSvg />
                            </div>
                            <div className='button' onClick={handleClick}>
                                PLAY
                            </div>
                        </div>
                        <div className='button'>HOW TO PLAY</div>
                    </div>
                </div>
            </div>
            <Fade duration='0.2s' in={isOpened}>
                <CalendarModal closeCalendar={closeCalendar} isOpened={isOpened} />
            </Fade>
        </>
    );
};

export default Menu;
