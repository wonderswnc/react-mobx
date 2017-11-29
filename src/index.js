import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import TestComponent from './TestComponent';

ReactDOM.render(<TestComponent />, document.getElementById('root'));
registerServiceWorker();
