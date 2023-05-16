var socket = io()

const chatSendBtn = document.querySelector('#send-btn')

chatSendBtn.addEventListener('click', () => {
    const chatInput = document.querySelector('#chat-input').value
    const chatHandle = document.getElementById('chat-handle').value
    const message = `<strong>${chatHandle}: </strong>${chatInput}`
    socket.emit('chat message', message)
})

socket.on('chat message', (message) => {
    const chatOutput = document.querySelector('.chat-output')
    chatOutput.innerHTML += `<div class="chat-message">${message}</div>`
})

socket.on('server message', (message) => {
    const chatOutput = document.querySelector('.chat-output')
    chatOutput.innerHTML += `<div class="chat-message">${message}</div>`
})
