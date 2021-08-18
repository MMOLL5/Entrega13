const chatForm = document.getElementById('chat-form');
const msg = document.getElementById('texto');
const userEmail = document.getElementById('email');

// const { username, room } = qsData;

const socketIo = io();
//Join to the room
socketIo.emit('JoinRoom', userEmail);

socketIo.on('message', (data) => {
  //add the message to the chat Window
  outputMessage(data);
});

//Message submit
chatForm.aaddEventListener('submit', (e) => {
  e.preventDefault();

  //Emit Message to the server
  socketIo.emit('chatMessage', msg.value);

  //Clear submitted message
  msg.value = '';
});

//Output Message to DOM
/**
 * We are going to create the following html output for each message
 *      <div class="message">
 *         <p class="meta">Brad <span>9:12pm</span></p>
 *         <p class="text">
 *           Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
 *           repudiandae.
 *         </p>
 *       </div>
 */
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="meta">${message.username} <span> ${message.time}</span></p>
  <p class="text"> ${message.text} </p>`;

  //chatMessages.appendChild(div);
}

//Get Room's Info
socketIo.on('roomUsers', (roomInfo) => {
  const { room, users } = roomInfo;

  outputRoomName(room);
  outputUsers(users);
});

//add Room Name
function outputRoomName(room) {
  roomName.innerText = room;
}

function outputUsers(users) {
  const arrayofUsers = users.map((aUser) => `<li>${aUser.username}</li>`);
  console.log(arrayofUsers);
  usersList.innerHTML = arrayofUsers.join('');
}