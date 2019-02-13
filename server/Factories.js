const uuid = require('uuid');

const createUser = ({name = ""}={})=>(
  {
    id: uuid(),
    name
  }
)

const createMessage = ({message = "", sender = ""}= {})=>(
  {
    id: uuid(),
    message,
    sender,
    time: getTime(new Date(Date.now()))
  }
)

const createChat = ({messages=[], name = "Community", users= []} = {})=>(
  {
    id: uuid(),
    messages,
    name, users,
    typingUsers: []
  }
)

const getTime = (date)=>{
  return `${date.getHours()}:${('0'+date.getMinutes()).slice(-2)}`;
}

module.exports = {
  createUser, createChat, createMessage
}