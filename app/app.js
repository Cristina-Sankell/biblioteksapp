const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)

app.use(express.static('public'))

server.listen(3000, () => {})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/chat.html')
})

app.get('/create', (req, res) => {
    res.sendFile(__dirname + '/create.html')
})

app.get('/search', (req, res) => {
    res.sendFile(__dirname + '/search.html')
})

app.get('/books', (req, res) => {
    res.sendFile(__dirname + '/books.html')
})

const chatRoom = 'chat room'
const chatWaitingRoom = 'chat waiting room'
let peopleInChat = 0

io.on('connection', (socket) => {
    peopleInChat++

    if (peopleInChat <= 2) {
        socket.join(chatRoom)
        socket.emit('server message', 'Välkommen till chatten!')
    } else {
        socket.join(chatWaitingRoom)
        socket.emit('server message', 'Du är placerad i kö...')
    }

    socket.on('disconnect', () => {
        peopleInChat--
    })

    socket.on('chat message', (message) => {
        io.to(chatRoom).emit('chat message', message)
    })
})
