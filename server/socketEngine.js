const constants = require('./SocketEvents');
const factories = require('./Factories');

const {VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, COMMUNITY_CHAT} = constants;

let connectedUser = {};

let communityChats = factories.createChat();

const SocketHandler = (io) =>{
  io.on('connection', (socket) =>{
    console.log(`One Connection(${socket.id}) ON`);
    io.emit('welcome', {word: "Welcome to socket"});

    // Verify User
    socket.on(VERIFY_USER, (nickname, cb)=>{
      console.log(VERIFY_USER, nickname)
      if(isUser(connectedUser, nickname)){
        cb({isUser: true, user: null});
      } else {
        cb({isUser: false, user: factories.createUser({name: nickname})});
      }
    })
    // User Connects with username
    socket.on(USER_CONNECTED, (user)=>{
      connectedUser = addUser(connectedUser, user);
      socket.user = user;

      io.emit(USER_CONNECTED, connectedUser);
      console.log(connectedUser);
    })

    // GET Community Chat 
    socket.on(COMMUNITY_CHAT, (cb)=>{
      cb(communityChats);
    })


    // User disconnct
    socket.on('disconnect', () => {
      console.log("User disconnect");
    });

    // User Logout
    socket.on(LOGOUT, ()=>{
      connectedUser = removeUser(connectedUser, socket.user.name);
      io.emit(USER_DISCONNECTED, connectedUser);
    })
    
  });
}

const addUser = (userList, user) =>{
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

const removeUser = (userList, user)=>{
  let newList = Object.assign({}, userList);
  delete newList[user];
  return newList;
}

const isUser = (userList, user)=>{
  return user in userList;
}

module.exports = SocketHandler;