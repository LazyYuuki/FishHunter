import express from "express"
import { Server } from "socket.io"
import http from "http"

const port = process.env.PORT || 80
const app = express()
const server = http.createServer(app)
const io = new Server(server)

const clientPath = '../dist_test'

// Define a queue structure
function Queue() {
  this.elements = [];

  this.enqueue = function (item) {
    this.elements.push(item);
  }

  this.dequeue = function () {
    element = this.elements[0] ?? null;
    this.elements.shift()
    return element;
  }

  this.front = function () {
    return this.elements[0] ?? undefined;
  }

  this.isEmpty = function () {
    return this.elements.length == 0 ? true : false;
  }
}

// const serverQueue = new Queue()

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
