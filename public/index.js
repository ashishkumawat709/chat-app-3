const socket = io()

let name;
let textarea = document.querySelector('#textarea')
let message__area = document.querySelector('.message__area')

do {
    name = prompt('enter your name')
} while (!name);

textarea.addEventListener('keypress', (e) => {
    if (e.key == 'Enter') {
        sendMessage(e.target.value)
    }
})


function sendMessage(message) {
    let data = {
        user: name,
        mymessage: message.trim()
    }

    appendmessage(data, 'outgoing')
    textarea.value = ""

    socket.emit('message', data)
}

function appendmessage(data, type) {
    let div = document.createElement('div')
    let classname = type;
    div.classList.add(classname, 'message')

    let bio = `<h3>${data.user}</h3>
                 <p>${data.mymessage}</p>                 
                `
    div.innerHTML = bio
    message__area.appendChild(div)
}

socket.on('message', (data) => {
    appendmessage(data, 'incoming')
})