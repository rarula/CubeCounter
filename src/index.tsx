import { JSX } from 'react';
import { createRoot } from 'react-dom/client';

const Main = (): JSX.Element => {
    return <h1>かぞえてブロック</h1>;
};

createRoot(document.getElementById('root')!).render(<Main />);
