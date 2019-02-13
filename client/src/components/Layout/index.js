import React, { Component } from 'react';
import io from 'socket.io-client';

import LoginForm from '../Login';
import ChatContainer from '../ChatContainer';
import constants from '../../config/constants';

// To Be Impletement in DevOp
const socketURL = "http://localhost:3002";

// Events
const socketEvents = constants.socketEvent;

export default class Layout extends Component {
  state = {
    socket: null,
    user: null,
  }

  componentWillMount(){
    this.initSocket();
  }

  initSocket = ()=>{
    const socket = io(socketURL, {
      timeout: 20000
    });
    socket.on('connect', ()=>{
      console.log(socket.id);
      console.log("Socket Connected");
    });

    this.setState({socket});
  }

  logout = ()=>{
    const socket = this.state.socket;
    socket.emit(socketEvents.LOGOUT);
    this.setState({user: null});
  }

  setUser = (user)=>{
    console.log(socketEvents.USER_CONNECTED, user);
    const {socket} = this.state;
    socket.emit(socketEvents.USER_CONNECTED, user);
    this.setState({user});
  }
  render() {
    const {socket, user} = this.state;
    if(user){
      document.title = `${user.name} | Socket Chat`;
    }
    return (
      <div className="container">
        {!user ? 
          <LoginForm socket={socket} setUser={this.setUser}/> : 
          <ChatContainer socket={socket} user={user} logout={this.logout}/>}
        
        
      </div>
    )
  }
}
