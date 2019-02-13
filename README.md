# React-Chat-Socketio
Hi! This is the full stack chat app which's implemented by [React.js](https://reactjs.org/), [Socket.io](https://socket.io/) and [Express](https://expressjs.com/). Jest feel free to view more document by above links. (if you want :stuck_out_tongue_winking_eye:) 

Since the project is a full stack project, backend and frontend should be ideally run in separate server. 


## Installation (back-end)

Folder `/server` would be codes for backend. Run the following command to install in **Root** folder would install its resources

    yarn 
or 

    npm install

## Installation (front-end)
Folder `/client` would be codes for backend. Run the following command to install in `./clent` folder would install its resources. Since the client side is build on [React.js](https://reactjs.org/)'s framework and create project by `craete-react-app` cli, just feel free to use any react-scrpit.

    yarn 
or 

    npm install

## Run (back-end)
In development stage, server will run by [nodemon](https://github.com/remy/nodemon): 

    yarn server-dev

In production (suggest to run by [PM2](http://pm2.keymetrics.io/)): 

    yarn server

## Run (Front-end)
In development stage, use react-cli (please setup scripts in package.json) : 

    cd ./client && yarn start

In production, build client side as static page first, then serve in any server: 

    cd ./client && yarn build

then you can run by [server.js](https://serverjs.io/documentation/)


# TO BE COMPLETE...