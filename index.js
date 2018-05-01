const express = require('express')
const app = express()
const path = require('path')


//settings
app.set('port', process.env.PORT || 3000)

//static files
app.use(express.static(path.join(__dirname,'public')))


//start server
const server = app.listen(app.get('port'),()=>{
    console.log('server on port ', app.get('port'));
    
})

//websockets
const socketIO = require('socket.io')
const io = socketIO(server)

io.on('connection', (socket)=>{
    console.log('new connection',socket.id);

    socket.on('chat:message', (data)=>{
        io.sockets.emit('chat:message', data)
        //console.log(data)
    })
    socket.on('chat:typing', (data)=>{
        socket.broadcast.emit('chat:typing', data)
        //console.log(data)
    })
})