import React, { Component } from 'react';
import constant from '../../config/constants';

export default class index extends Component {
  state = {nickname: "", error: "" }

  setUser = ({user, isUser})=>{
    console.log(user, isUser);
    if(isUser){
      this.setError("User name token");
    } else {
      this.props.setUser(user);
    }
  }

  setError = (error)=>{
    this.setState({error});
  }  

  handleSubmit = (e)=>{
    e.preventDefault();
    const {socket} = this.props;
    const {nickname} = this.state;
    console.log(constant.socketEvent.VERIFY_USER, nickname);
    socket.emit(constant.socketEvent.VERIFY_USER, nickname, this.setUser);
  }

  handleOnChange = (e)=>{
    this.setState({nickname: e.target.value});
  }

  render() {
    const { nickname, error } = this.state;
    
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form">
          <label htmlFor="nickname">
            <h2>Got a nickname?</h2>
          </label>
          <input type="text"
            ref={(input)=>{ this.textInput = input}}
            id="nickname"
            value = {nickname}
            onChange = {this.handleOnChange}
            placeholder = "Use A Cool Nickname"
          />

          { error!=="" ? <div>{error}</div> : <div/>}
        </form>
        
      </div>
    )
  }
}
