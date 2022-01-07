import express from "express"
import { Server } from "socket.io"
import http from "http"

const port = process.env.PORT || 80
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const clientPath = '../client'

// Send the client package to client
app.use(express.static(clientPath));

// Process on connection
io.on("connection", async socket => {

  io.emit("chat message", "User " + socket.id + " just join")
  console.log("a user connected")

  socket.on("disconnect", () => {
    console.log("user disconnected")
  })

  socket.on('chat message', (msg) => {
    io.emit("chat message", msg)
  });
})

server.listen(port, () => {
  console.log('listening on *:' + port);
});
