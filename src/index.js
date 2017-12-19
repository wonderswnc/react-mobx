import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
// import TestComponent from './TestComponent';
// import MobxComponent from './NewComponent';
// import AntdComponent from './StyledComponents';
// import LazyImage from './LazyImage';
// import AnimationComponent from './prectice/Animation';
// import MobxReact from './prectice/MobxReact';
// import Keep from './prectice/MyGoogleKeep';
import Swiper from './components/Swiper';

const testImgList = [
  'http://www.funfate.com/wp-content/uploads/2017/04/09/659c20f75d.jpg',
  'http://www.funfate.com/wp-content/uploads/2017/04/09/659c20f75d.jpg',
  'http://www.funfate.com/wp-content/uploads/2017/04/09/659c20f75d.jpg'
]

ReactDOM.render(<Swiper imgList={testImgList}/>, document.getElementById('root'));
registerServiceWorker();
