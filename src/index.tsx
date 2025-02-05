import { createRoot } from 'react-dom/client';

import Game from './components/Game';
import Menu from './components/Menu';
import GameStateProvider, { useGameState } from './contexts/GameState';

import './global.css';

const Main = (): JSX.Element => {
    const state = useGameState();
    return <main className='main'>{state.isPlaying ? <Game /> : <Menu />}</main>;
};

createRoot(document.getElementById('root')!).render(
    <GameStateProvider>
        <Main />
    </GameStateProvider>,
);
