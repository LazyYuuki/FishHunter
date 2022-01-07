import * as keyboardjs from 'keyboardjs';
import { io } from 'socket.io-client';

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