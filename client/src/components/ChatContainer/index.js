import React, { Component } from 'react';
import SideBar from '../SideBar';
import constant from '../../config/constants';
import ChatHeading from '../ChatHeading';
import Messages from '../Messages';
import MessageInput from '../MessageInput';

export default class ChatContainer extends Component {
  state = {
    chats: [],
    activeChat: null,
  }

  componentDidMount(){
    const {socket} = this.props;
    socket.emit(constant.socketEvent.COMMUNITY_CHAT, this.resetChat);
  }

  resetChat = (chat)=>{
    console.log(chat);
    return this.addChat(chat, true);
  }

  addChat = (chat, reset)=>{
    const {socket} = this.props;
    const {chats} = this.state;
    
    const newChats = reset ? [chat]: [...chats, chat]; 
    this.setState({chats: newChats});

    const messageEvent = `${constant.socketEvent.MESSAGE_RECEIVED}-${chat.id}`;
    const typingEvent = `${constant.socketEvent.TYPING}-${chat.id}`;
    
    socket.on(typingEvent);
    socket.on(messageEvent, this.addMessageToChat(chat.id));
  }

  addMessageToChat = (chatId) =>{
    return (message)=>{
      const {chats} = this.state;
      let newChats = chats.map((chat)=>{
        if(chat.id === chatId){
          chat.messages.push(message)
        }
        return chat;
      });
      this.setState({chats: newChats});
    }
  }


  setActiveChat = (activeChat)=>{
    this.setState({activeChat})
  }

  sendMessage = (chatId, message)=>{
    const {socket} = this.props;
    socket.emit(constant.socketEvent.MESSAGE_SENT, {chatId, message});
  }

  sendTyping = (chatId, isTyping)=>{
    const {socket} = this.props;
    socket.emit(constant.socketEvent.TYPING, {chatId, isTyping});
  }

  render() {
    const {user, logout} = this.props;
    console.log(this.props)
    const {activeChat, chats} = this.state;
    return (
      <div className="container">
        <SideBar logout={logout} 
          chats = {chats}
          user={user} 
          activeChat={activeChat} 
          setActiveChat={this.setActiveChat} />

        <div className="chat-room-container">
          { activeChat != null ? (
            <div className="chat-room">
              <ChatHeading name={activeChat.name}/>
              <Messages massages = {activeChat.messages}
                user={user}
                typingUsers={activeChat.typingUsers}
              />
              <MessageInput
                sendMessage={(message)=>{this.sendMessage(activeChat.id, message)}}
                sendTyping={(isTyping)=>{this.sendTyping(activeChat.id, isTyping)}}
              />
            </div>
          ): ( 
            <div className="chat-room choose">
              <h3>Choose a chat</h3>
            </div>
          )
          }
        </div>
      </div>
    )
  }
}
