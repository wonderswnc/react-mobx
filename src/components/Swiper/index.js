import React from 'react';
import { observable, computed, autorun, observe } from 'mobx';
import { observer } from 'mobx-react';
import Proptypes from 'prop-types';
import './style.less';

const throttle = (throttleInterval = 500) => {
  let nextTime = 0;
  return (callback, ...props) => {
    const currentTime = Date.now();
    if (currentTime > nextTime) {
      callback(...props);
      nextTime = currentTime + throttleInterval;
    }
  }
}

class LazyImage extends React.Component {
  state = {
    loading: true,
    src: ''
  }

  componentDidMount() {
    const image = new Image();
    image.src = this.props.src;
    image.onload = () => {
      this.setState({src: this.props.src, loading: false})
    }
  }

  render() {
    const { loading, src } = this.state;
    const { width, height } = this.props;
    return (
      <div className='image-wrapper' style={{width, height}}>
        {
          loading ? 
            <span>loading ...</span> : 
            <img src={src} alt='beautiful picture' />  
        }
      </div>
    )
  }
}

@observer
export default class Swiper extends React.Component {

  @observable currentIndex = 1;
  @observable delay = '500ms';
  @computed get currentOffset() {
    return `${-800 * this.currentIndex}px`;
  }
  @computed get isBorder() {
    if (this.currentIndex === 0) {
      return 'left';
    } else if (this.currentIndex === this.imgList.length - 1){
      return 'right';
    } else {
      return false;
    }
  }

  static fetch = () => {
    const imgList = [
      'http://5b0988e595225.cdn.sohucs.com/images/20171212/7e545fc28fae4c02a5931b5872fa1f72.jpeg',
      'http://reso3.yiihuu.com/img_966182.jpg',
      'http://www.3dmgame.com/UploadFiles/201208/20120804104027863.jpg'
    ]
    return Promise.resolve({imgList: imgList});
  }

  constructor(props) {
    super(props);
    const { data: {imgList} } = props;
    this.imgList = [imgList[imgList.length - 1], ...imgList, imgList[0]];
    this.throttle = throttle().bind(this);
  }

  componentDidMount() {
    autorun(() => {
      const changeCurrentIndex = type => {
        this.delay = '0ms';
        this.currentIndex = type === 'left' ? this.imgList.length - 2 : 1;
      };
      this.isBorder && setTimeout(() => 
        changeCurrentIndex(this.isBorder), 500);
    });
  }

  turnLeft = () => {
    this.throttle((info) => {
      this.delay = '500ms';
      this.currentIndex --;
      console.log(info);
    }, 'left')
  }

  turnRight = () => {
    this.throttle(() => {
      this.delay = '500ms';
      this.currentIndex ++;
    })
  }

  render() {
    return (
      <div className='swiper'>
        <div className='content'>
          <div className='img-list' style={{
              width: `${this.imgList.length * 800}px`,
              transform: `translateX(${this.currentOffset})`,
              transitionDuration: this.delay
            }}>
            {
              this.imgList.map((src, index) => 
                <LazyImage key={index} width='800px' height='450px' src={src}
                  onload={this.changeView}/>)
            }
          </div>
        </div>
        <div className='control'>
            <button onClick={this.turnLeft}>turn left</button>
            <button onClick={this.turnRight}>turn right</button>
        </div>
      </div>
    )
  }
}