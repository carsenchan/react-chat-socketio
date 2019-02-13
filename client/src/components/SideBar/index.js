import React, { Component } from 'react';

import {FaBars, FaSearch} from 'react-icons/fa';
import {MdEject, MdKeyboardArrowDown} from 'react-icons/md';

export default class SideBar extends Component {
  render() {
    const {logout, chats, user, activeChat, setActiveChat} = this.props;

    return (
      <div id="side-bar">
        <div className="heading">
          <div className="app-name">Socket Chat <MdKeyboardArrowDown/></div>
          <div className="menu"><FaBars/></div>
        </div>
        <div className="search">
          <i className="search-icon"><FaSearch/></i>
          <input type="text" placeholder="Search"/>
          <div className="plus"></div>
        </div>
        <div className="users" ref="users"
          onClick = {(e)=>{
            (e.target === this.refs.user) && setActiveChat(null)
          }}>
          {
            chats.map((chat)=>{
              if(chat.name){
                const lastMessage = chat.messages.length>0 ?chat.message[chat.messages.length -1]:undefined;
                const user = chat.users.find(({name})=>{
                  return name !== this.props.user.name
                }) || {name: "Commutity"};
                
                const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : '';
                
                return (<div
                  key={chat.id}
                  className = {`user ${classNames}`}
                  onClick={()=>{setActiveChat(chat)}}
                >
                  <div className="user-photo">{user.name[0].toUpperCase()}</div>
                  <div className="user-info">
                    <div className="name">{user.name}</div>
                    {lastMessage && <div className="last-message">{lastMessage.message}</div>}
                  </div>
                </div>);
              } 
              return null;
            })
          }
        </div>
        <div className="current-user">
          <span>
            {user.name}
          </span>
          <div className="logout" title="Logout" onClick={()=>{logout()}}>
            <MdEject/>
          </div>
        </div>
      </div>
      
    )
  }
}
