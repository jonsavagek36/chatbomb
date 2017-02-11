import React, { Component } from 'react';

class NamePlate extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let bomb = null;
    if (this.props.live) {
      bomb = <img src={'https://www.goodfreephotos.com/albums/vector-images/black-bomb-vector-clipart.png'} className='mini-bomb' />;
    }
    return (
      <div className={this.props.newClass} onClick={this.props.selectFriend}>
        {this.props.friend.screen_name}{bomb}
      </div>
    );
  }
}

export default NamePlate;
