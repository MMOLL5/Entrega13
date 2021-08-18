const socket = io.connect('http://localhost:8080', { forceNew: true });

socket.emit('askData');

function sendData(e) {
    const input = document.getElementById('title');
    const input1 = document.getElementById('price');
    const input2 = document.getElementById('thumbnail');
    const obj = {
        tit: input.value,
        pri: input1.value,
        thu: input2.value
    };
    socket.emit('new-message', obj);
}

function render(data) {
var html = data
    .map(function (elem, index) {
    if(elem.thu=='Foto'){    
        return `<div>            
                <tr><td> ${elem.tit} </td>
                <td>${elem.pri}</td>
                <td>${elem.thu}</td>
            </div>`;
    }else{
        return `<div>            
        <tr><td> ${elem.tit} </td>
        <td>${elem.pri}</td>
        <td><img src="${elem.thu}" width="32" height="32"></td>
    </div>`;
    }
    })
    .join(' ');

document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function (data) {
    console.log('RECIBI MENSAJE');
    render(data);
});

/*const chatForm = document.getElementById('chat-form');
const msg = document.getElementById('texto');
const userEmail = document.getElementById('email');

const socketIo = io();
socket.emit('JoinRoom', userEmail);

socketIo.on('message', (data) => {
    //add the message to the chat Window
    outputMessage(data);
});

  //Message submit
chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
console.log('msg', msg.value)
    //Emit Message to the server
    socketIo.emit('chatMessage', msg.value);

    //Clear submitted message
    msg.value = '';
});

function outputMessage(message) {
const div = document.createElement('div');
div.classList.add('message');
div.innerHTML = `
<p class="meta">${message.username} <span> ${message.time}</span></p>
<p class="text"> ${message.text} </p>`;

//chatMessages.appendChild(div);
};*/