// ada di dokumentasi socket
const express = require('express')
const httpServer = require('http')
const cors = require('cors')
const socketIO = require('socket.io')

// port mongodb
const PORT = process.env.PORT || 2021
const app = express()

app.use(express.json())
app.use(cors)

// KOnfigurasi server socket
const server = httpServer.createServer(app)
const io = socketIO(server)

// array menampung data dari socket
let user = []
let arrMsg = [] // sbeelum disimpan ke database, disimpan dulu ke array chat ini

app.get('/', (req, res) => {
    res.status(200).send("<h4>Welcome to chat API</h4>")
})
// koneksi socket
io.on('connection', socket => {
    // untuk membuat koneksi atau join koneksi
    socket.on("JoinChat", data => {
        console.log(socket.id, data)
        io.emit("notif", `Joined chat. User ID: ${socket.id}`)
    })

    socket.on("chatMessage", chat =>{
        arrMsg.push(chat)
        io.emit("updateMessage", arrMsg)
    })

    // untuk keluar koneksi
    socket.on("disconnect", ()=>{

    })
})

// dari front end --> join chat akan dimasukan ke list chat
server.listen(PORT, () => console.log("Connect to chat api at PORT:", PORT))
