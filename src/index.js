import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import TestComponent from './TestComponent';
import MobxComponent from './NewComponent';

ReactDOM.render(<MobxComponent />, document.getElementById('root'));
registerServiceWorker();
