import express from 'express'
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import http from "http";
import cors from 'cors'
import { config } from './config.js'

const app = express()

app.use(cors({ origin: "*" }))
app.use(morgan('dev'))

const server = http.createServer(app)
const io = new SocketServer(server, { cors: { origin: '*' } })


io.on('connection', socket => {

    socket.on('message', ( message) => {
        console.log('message: ' + message)
        // socket.broadcast.emit('server', 'authorizeserver')
        socket.broadcast.emit('server', 'authorizeserver')
    })

})


server.listen(config.port)
console.log('server started on ', config.port)