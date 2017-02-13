import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import ChatBox from './ChatBox';
import Friendlist from './Friendlist';

import io from 'socket.io-client';

let socket = io.connect('http://localhost:5000');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
      requests: [],
      friends: [],
      online_friends: [],
      selectedFriend: {},
      conversations: {},
      liveMessages: [],
      points: 0
    };

    //REACT BINDS
    this.selectFriend = this.selectFriend.bind(this);
    this.removeLiveMessage = this.removeLiveMessage.bind(this);

    // TEST BINDS
    this.startTest = this.startTest.bind(this);
    this.userOne = this.userOne.bind(this);
    this.userTwo = this.userTwo.bind(this);
    this.userThree = this.userThree.bind(this);

    // SOCKET BINDS
    this.clientInit = this.clientInit.bind(this);
    this.refreshRequest = this.refreshRequest.bind(this);
    this.refreshFriends = this.refreshFriends.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.receiveMessage = this.receiveMessage.bind(this);
    this.sendLiveChange = this.sendLiveChange.bind(this);
    this.receiveLiveChange = this.receiveLiveChange.bind(this);
    this.bombChat = this.bombChat.bind(this);
  }

  componentDidMount() {
    // INIT
    let _ = this;
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        FB.api('/me?fields=id', function(response) {
          let fetchBody = {
            facebook_id: response.id
          };
          let myHeaders = new Headers();
          myHeaders.append('Access-Control-Allow-Origin','*');
          myHeaders.append('Content-Type','application/json');
          fetch(`http://localhost:3000/api/v1/users/sign_in`, {
            method: 'POST',
            body: JSON.stringify(fetchBody),
            headers: myHeaders
          })
            .then(response => {
              if (response.ok) {
                return response;
              } else {
                console.log('Failed to sign in.');
              }
            })
            .then(response => response.json())
            .then(data => {
              console.log(data);
              if (data.success == true) {
                let user = {
                  id: data.user.id,
                  facebook_pic: data.user.facebook_pic,
                  screen_name: data.user.screen_name,
                  email: data.user.email,
                  points: data.user.points
                };
                _.setState({
                  profile: user,
                  requests: data.requests,
                  friends: data.friends
                });
                _.clientInit();
              } else {
                browserHistory.push('/setup');
              }
            })
        });
      }
    });

    // INCOMING EVENTS
    socket.on('connect:good', this.goodConnect);
    socket.on('test:message', this.testMessage);
    socket.on('friends:refreshed', this.refreshFriends);
    socket.on('receive:message', this.receiveMessage);
    socket.on('receive:live', this.receiveLiveChange);
    socket.on('bomb:chat', this.bombChat);
  }
  // INCOMING FUNCTIONS
  goodConnect(data) {
    console.log(data);
  }

  testMessage(data) {
    console.log(data);
  }

  refreshFriends(data) {
    this.setState({ online_friends: data.friends_on });
  }

  receiveMessage(data) {
    if (data.sender_id == this.state.selectedFriend.id) {
      this.setState({ liveChat: '' });
    }
    let message = {
      sender_id: data.sender_id,
      target_id: data.target_id,
      sender_name: data.sender_name,
      target_name: data.target_name,
      message: data.message
    };
    let convos = this.state.conversations;
    let waiting = this.state.waiting;
    let convoCode = message.sender_id;
    if (convos[convoCode] == undefined) {
      convos[convoCode] = [];
    }
    convos[convoCode].push(message);
    this.setState({ conversations: convos });
    // LIVE MESSAGES
    let live_msgs = this.state.liveMessages;
    live_msgs.push(data.sender_id);
    this.setState({ liveMessages: live_msgs });
    // ADD POINT
    this.setState({ points: this.state.points + 1 });
  }

  receiveLiveChange(data) {
    if (data.sender_id == this.state.selectedFriend.id) {
      this.setState({ liveChat: data.live_string });
    }
  }

  bombChat(data) {
    let chat_id = data.chat_id;
    let convos = this.state.conversations;
    delete convos[chat_id];
    this.setState({ conversations: convos });
  }

  // OUTGOING FUNCTIONS
  clientInit() {
    let userData = {
      profile_id: this.state.profile.id,
      socket_id: socket.id
    };
    socket.emit('client:login', userData);
  }

  refreshRequest() {
    if (this.state.friends != null) {
      socket.emit('friends:refresh', { friends: this.state.friends });
    }
  }

  sendMessage() {
    let me = this.state.profile;
    let target = this.state.selectedFriend;
    let textNode = document.getElementById('send-chat');
    let convos = this.state.conversations;
    let convoCode = target.id;
    if (convos[convoCode] == undefined) {
      convos[convoCode] = [];
    }
    let last = convos[convoCode].length - 1;
    let message = {
      sender_id: me.id,
      target_id: target.id,
      sender_name: me.screen_name,
      target_name: target.screen_name,
      message: textNode.value
    }
    convos[convoCode].push(message);
    this.setState({ conversations: convos });
    socket.emit('send:message', message);
    textNode.value = '';
    // Stop countdown
    if (this.state.liveMessages.indexOf(target.id) > -1) {
      this.removeLiveMessage(false);
    }
  }

  sendLiveChange() {
    let me = this.state.profile;
    let target = this.state.selectedFriend;
    let textNode = document.getElementById('send-chat');
    let live_string = {
      sender_id: me.id,
      target_id: target.id,
      live_update: textNode.value
    };
    socket.emit('send:live', live_string);
  }

  chatBomb() {
    let me = this.state.profile;
    let target = this.state.selectedFriend;
    let payload = {
      sender_id: me.id,
      receiver_id: target.id
    };
    socket.emit('chat:bomb', payload);
  }

  // REACT EVENTS
  selectFriend(friend) {
    this.setState({ selectedFriend: friend });
  }

  removeLiveMessage(zero) {
    let live_msgs = this.state.liveMessages;
    let friend_id = this.state.selectedFriend.id;
    let idx = live_msgs.indexOf(friend_id);
    live_msgs.splice(idx, 1);
    this.setState({ liveMessages: live_msgs });
    if (zero) {
      this.chatBomb();
    }
  }

  toRequests() {
    browserHistory.push('/requests');
  }

  logoutUser() {
    FB.logout(function(response) {
      if (response.status !== 'connected') {
        browserHistory.push('/');
      }
    });
  }

  // LOAD TEST CASES
  userOne() {
    this.setState({
      profile: prof_hash,
      friends: friend_arr
    });
  }
  userTwo() {
    this.setState({
      profile: prof_hash2,
      friends: friend_arr2
    });
  }
  userThree() {
    this.setState({
      profile: prof_hash3,
      friends: friend_arr3
    });
  }
  startTest() {
    this.clientInit();
  }

  render() {
    return (
      <div>
        <div className='top'>
          CHATBOMB <br />
          <div className='points'>{this.state.points} Points</div>
          <div className='menu'>
            <button onClick={this.toRequests} className='menu-btn'>Requests</button>
            <button onClick={this.refreshRequest} className='menu-btn'>Refresh Friends</button>
            <button onClick={this.logoutUser} className='menu-btn-right'>Log Out</button>
          </div>
        </div>
        <div id='main-div'>
          <ChatBox
            selectedFriend={this.state.selectedFriend}
            conversations={this.state.conversations}
            sendMessage={this.sendMessage}
            liveChat={this.state.liveChat}
            sendLiveChange={this.sendLiveChange}
            liveMessages={this.state.liveMessages}
            removeLiveMessage={this.removeLiveMessage}
              />
          <img src={'https://www.goodfreephotos.com/albums/vector-images/black-bomb-vector-clipart.png'} id='bomb-img' />
          <Friendlist
            profile={this.state.profile}
            online_friends={this.state.online_friends}
            selectFriend={this.selectFriend}
            selectedFriend={this.state.selectedFriend}
            liveMessages={this.state.liveMessages}
              />
        </div>
      </div>
    );
  }
}

export default App;
