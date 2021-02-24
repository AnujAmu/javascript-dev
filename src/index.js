import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {BrowserRouter} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import './assets/styles/custom.css';


function App() {
    return (
        <BrowserRouter>
                <Routes component={Routes}/>
        </BrowserRouter>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));

serviceWorker.unregister();