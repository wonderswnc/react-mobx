import React from 'react';
import styled, { keyframes } from 'styled-components';

const Fade = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const AnimationText = styled.span`
  animation: ${Fade} 2s ease-in-out infinite;
  display: inline-block;
  width: 100%;
  text-align: center;
  line-height: 200px;
`;

const fadein = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const ImageWrapper = styled.img`
  animation: ${fadein} .5s ease-in-out 1;
  width: 100%;
  
  height: 100%;
`;

const LzayContent = styled.span`
  width: ${({width = '200px'}) => width};
  height: ${({height = '200px'}) => height};
  display: inline-block;
  background-color: #ccc;
  vertical-align: middle;
`;

class LazyImage extends React.Component {

  state = {
    loading: true,
    src: ''
  };

  componentDidMount() {
    const {url} = this.props;
    const img = new Image();
    img.src = url;
    img.onload = () => {
      this.setState({loading: false, src: url})
    }
  }

  render() {
    const {loading, src} = this.state;
    return (
      <LzayContent {...this.props}>
        {
          loading ?
            <AnimationText> loading ... </AnimationText> :
            <ImageWrapper src={src} alt="beautiful gril"/>
        }
      </LzayContent>
    )
  }
}

export default class TestLazyImage extends React.Component {

  state = {
    loadingImage: false
  };

  changeView = () => {
    this.setState({loadingImage: !this.state.loadingImage})
  };

  render() {
    const {loadingImage} = this.state;
    return (
      <div>
        {
          loadingImage ?
            <LazyImage url={"http://pic.pc6.com/up/2010-12/2010123093357315.jpg"}/> :
            null
        }
        <button onClick={this.changeView}> click me to show the picture</button>
      </div>
    )
  }
}