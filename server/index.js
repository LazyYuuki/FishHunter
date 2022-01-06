const port = process.env.PORT || 8080
const path = require('path')
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)

// app.get("/", (req, res) => {
//   res.sendFile("/client/index.html", { "root": "../" });
//   console.log(path.dirname(__dirname))
// })

const clientPath = path.dirname(__dirname) + '/client'

app.use(express.static(clientPath));

io.on("connection", socket => {
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
