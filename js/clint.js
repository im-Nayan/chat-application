const socket = io('http://localhost:2000');
console.log('socket',socket);

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.zzz');

// const image = $('#image').attr('src');
// // const image = document.querySelector('.imgright')
// console.log('image',image);


const append = (message,position)=>{
    console.log('position',position);
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`you:`,'userNameright');
    // append(`${image}`,'imgright');
    append(`${message}`,'tright');
    socket.emit('send',message);
    messageInput.value =''
})


const name = prompt("Enter your name");
socket.emit('new_user_join',  name);

socket.on('user_join',name=>{
    // console.log('name',name);
    append(`${name} join the chat`,'join')
})
socket.on('receive',data=>{
    append(`${data.name} :`,'userNameleft')
    append(`${data.message}`,'left')
})
socket.on('left',name=>{
    append(`${name} left the chat`,'leave')
})