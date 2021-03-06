import './css/index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import App from './components/App';
import reducers from './reducers';
//import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';
window.axios = axios;

const middleware = [reduxThunk];
const store = createStore(reducers, {}, compose(
    applyMiddleware(...middleware),
    typeof window === 'object' && process.env.NODE_ENV !== 'production' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

//registerServiceWorker();

console.log("Environment is ", process.env.NODE_ENV);
