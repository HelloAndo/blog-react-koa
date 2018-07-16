import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import AppBar from './components/app-bar'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
