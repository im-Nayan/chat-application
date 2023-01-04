// const app = require('express')();
const cors = require('cors');



const users = {};

let options1={
    allowEIO3: true,  // Whether to enable compatibility with Socket.IO v2 clients.
    cors: {
        origins:'*',
        // methods: ["GET", "POST"],
        transports: ['websocket', 'polling'],
        // methods: allowedMethods,
        // allowedHeaders: ["x-access-token"],
        // credentials: true
    }
};

const io = require('socket.io')(2000,options1);



io.on('connection',socket =>{

    // IF NEW USER JOIN THE CHAT 
    socket.on('new_user_join',name=>{
        console.log('new user',name);
        users[socket.id] = name;
        socket.broadcast.emit('user_join',name);
    })

    // SOME ONE SEND A MESSAGE ,BREADCAST IT TO OTHER USERS
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    })

    // IF ANY ONE LEAVE
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})