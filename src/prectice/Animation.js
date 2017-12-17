import React from 'react';
import './animation.less';

export default class AnimationComponent extends React.Component {
  render() {
    return (
      <div>
        <div className='animation'></div>
        <div style={{height: '200px',backgroundColor: '#ccc'}}></div>
      </div>
    )
  }
}