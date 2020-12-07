import { ReactElement } from 'react';
import ReactDOM from 'react-dom';
import { Window } from '../Components/Window/Main.jsx';

export const addWindow = (data, w, h, x, y) => {
    return <Window windowZ={40} label={data.label} id={data.id} widget={data.element} sizeW={ w !== undefined ? w : 420} sizeH={ h !== undefined ? h : 300} x={ x !== undefined ? x : 0} y={ y !== undefined ? y : 40}/>
}