import React, { Component } from 'react';
import { browserHistory } from 'react-router';

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <div className='top'>
          CHATBOMB
        </div>
        <div id='main-div'>
          <div id='setup-form'>
            <div className='label'>Screen Name:</div><div className='f-right'><input type='text' id='setup-sn' /></div>
            <div className='label'>E-Mail:</div><div className='f-right'><input type='text' id='setup-email' /></div>
            <div className='label'><button id='setup-submit'>Submit</button></div>
          </div>
          <img src={'https://www.goodfreephotos.com/albums/vector-images/black-bomb-vector-clipart.png'} id='bomb-img' />
        </div>
      </div>
    );
  }
}

export default Setup;
