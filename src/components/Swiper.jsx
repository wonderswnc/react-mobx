import React from 'react';
import { observable, computed, autorun, observe } from 'mobx';
import { observer } from 'mobx-react';
import Proptypes from 'prop-types';
import './Swiper.less';

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
      this.props.onload();
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

  constructor(props) {
    super(props);
    const { imgList } = props;
    this.imgList = [imgList[imgList.length - 1], ...imgList, imgList[0]];
    
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
    this.delay = '500ms';
    this.currentIndex --;
  }

  turnRight = () => {
    this.delay = '500ms';
    this.currentIndex ++;
  }

  // changeView = () => {
  //   this.loadCount ++;
  // }

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