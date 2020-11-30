import { ReactElement } from 'react';
import ReactDOM from 'react-dom';

export const createWindow = (window_id: Number, widget: ReactElement) => {
    let div_id = "div-window-" + window_id;
    if (document.getElementById(div_id) == null) {
        var windows = document.createElement("div");
        windows.setAttribute("id", div_id);
        var homeDiv = document.getElementById('topbar');
        document.body.insertBefore(windows, homeDiv);
        ReactDOM.render(
            widget ,
            document.getElementById(div_id)
        );
    }
}

export default createWindow;