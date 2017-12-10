import React, { Component } from 'react';

class AtomicImage extends Component {
   constructor(props) {
      super(props);
      this.state = {
        dimensions: {}
      };

      this.onImgLoad = this.onImgLoad.bind(this);
    }
    onImgLoad({ target: img }) {
      const dimensions = {
        height: img.offsetHeight,
        width: img.offsetWidth
      }

      this.setState({
        dimensions: {
          height:img.offsetHeight,
          width:img.offsetWidth
        }
      });
    }
    render(){
      const { width, height } = this.state.dimensions;
      const isLandscape = width >= height;
      const className = isLandscape ? 'landscape' : 'portrait';

      return (
        <img
          className={className}
          onLoad={this.onImgLoad}
          {...this.props}
        />
      );
    }
}

export default AtomicImage;
