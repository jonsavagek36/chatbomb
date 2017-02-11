import React, { Component } from 'react';

class ChatHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalId: '',
      time: null
    };
    this.timer = this.timer.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.startTimer(nextProps.live);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  startTimer(perhaps) {
    if (perhaps) {
      this.setState({ time: 30 });
      let intervalId = setInterval(this.timer, 1000);
      this.setState({ intervalId: intervalId });
    } else {
      clearInterval(this.state.intervalId);
      this.setState({ time: null, intervalId: '' });
    }
  }

  timer() {
    let newTime = this.state.time;
    if (newTime > 0) {
      this.setState({ time: newTime - 1 });
    } else {
      this.setState({ time: null });
      clearInterval(this.state.intervalId);
      this.props.removeLiveMessage(true);
    }
  }

  render() {
    return (
      <div id='chat-header'>
          <span>{this.props.selectedFriend.screen_name}</span>
          <span className='time'>00:{this.state.time}</span>
      </div>
    );
  }
}

export default ChatHeader;
