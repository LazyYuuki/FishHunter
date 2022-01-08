

export default function fromServer(socket) {

  socket.on('client', function (msg) {
    var item = document.createElement('li');
    item.textContent = JSON.stringify(msg, null, 5);
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });

}