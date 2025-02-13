import { useState } from 'react';

import CalendarModal from './CalendarModal';
import Fade from './Fade';
import { CalendarSvg, CrossSvg } from './Svg';
import { useGameState } from '../contexts/GameState';
import { toDateString } from '../core/utils';

const Menu = (): JSX.Element => {
    const state = useGameState();
    const [isCalendarOpened, setCalendarOpened] = useState(false);
    const [isHowToPlayOpened, setHowToPlayOpened] = useState(false);

    const dateStr = toDateString(state.date);

    const openCalendar = (): void => {
        setCalendarOpened(true);
    };
    const closeCalendar = (): void => {
        setCalendarOpened(false);
    };

    const openHowToPlay = (): void => {
        setHowToPlayOpened(true);
    };
    const closeHowToPlay = (): void => {
        setHowToPlayOpened(false);
    };

    return (
        <>
            <div className='menu'>
                <h1>かぞえてブロック</h1>
                <h3>{dateStr}</h3>
                <div className='menu-panel'>
                    <div className='relative'>
                        <div className='icon-button calendar-button' onClick={openCalendar}>
                            <CalendarSvg />
                        </div>
                        <div className='button' onClick={() => state.setPlaying(true)}>
                            PLAY
                        </div>
                    </div>
                    <div className='button' onClick={openHowToPlay}>
                        HOW TO PLAY
                    </div>
                </div>
            </div>
            <Fade duration='0.2s' in={isCalendarOpened}>
                <CalendarModal closeCalendar={closeCalendar} isOpened={isCalendarOpened} />
            </Fade>
            <Fade duration='0.2s' in={isHowToPlayOpened}>
                <div className='modal-background' onClick={closeHowToPlay} />
                <div className='modal how-to-play'>
                    <div className='htp-close' onClick={closeHowToPlay}>
                        <CrossSvg />
                    </div>
                    <h2 className='text-center color-gray'>How To Play</h2>
                    <div className='htp'>
                        <img className='htp-img' src='how-to-play.png' />
                        <ol className='htp-letter-list'>
                            <li className='htp-letter'>
                                <span className='color-gray'>画面上に表示される立方体の総数を数えましょう。隠れていて見えない位置の立方体も考慮することに注意してください。</span>
                            </li>
                            <li className='htp-letter'>
                                <span className='color-gray'>正しい総数を示しているボタンを押して解答します。正解すると次の問題に移ります。</span>
                            </li>
                            <li className='htp-letter'>
                                <span className='color-gray'>問題は全部で5つです。すべての問題に正解すると終了します。</span>
                            </li>
                        </ol>
                    </div>
                </div>
            </Fade>
        </>
    );
};

export default Menu;
