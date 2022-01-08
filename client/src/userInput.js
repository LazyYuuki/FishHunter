import * as keyboardjs from 'keyboardjs';

export default function userInputHandler(socket) {
  keyboardjs.bind("w", () => {
    socket.emit("payload", {
      username: socket.id,
      action: "w"
    })
  })

  keyboardjs.bind("s", () => {
    socket.emit("payload", {
      username: socket.id,
      action: "s"
    })
  })
}