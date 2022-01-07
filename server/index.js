import express from "express"
import { Server } from "socket.io"
import http from "http"

const port = process.env.PORT || 80
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const clientPath = '../dist'

// Send the client package to client
app.use(express.static(clientPath));

// Process on connection
io.on("connection", socket => {

  io.emit("message", "Socket " + socket.id + " just join")

  socket.on("disconnect", () => {
    io.emit("message", "Socket " + socket.id + " just left")
  })

  socket.on("payload", payload => {
    io.emit("message", JSON.stringify(payload))
  })

})

server.listen(port, () => {
  console.log('listening on *:' + port);
});
