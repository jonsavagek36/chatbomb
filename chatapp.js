let io;
let clients = [];

exports.init = function(sio, socket) {
  let io = sio;

  socket.on('client:login', function(data) {
    let client = {
      id: data.profile_id,
      socket_id: data.socket_id
    };
    clients.push(client);
    socket.emit('connect:good', client);
  });

  socket.on('friends:refresh', function(data) {
    let friends = data.friends;
    let friends_online = [];
    clients.forEach((client) => {
      friends.forEach((friend) => {
        if (client.id == friend.id) {
          friends_online.push(friend);
        }
      });
    });
    socket.emit('friends:refreshed', { friends_on: friends_online });
  });

  socket.on('send:message', function(data) {
    let target = clients.filter(client => {
      if (client.id == data.target_id) {
        return client;
      }
    });
    let message = {
      sender_id: data.sender_id,
      target_id: data.target_id,
      sender_name: data.sender_name,
      target_name: data.target_name,
      message: data.message
    };
    let target_sock = target[0].socket_id;
    io.to(target_sock).emit('receive:message', message);
  });

  socket.on('send:live', function(data) {
    let target = clients.filter(client => {
      if (client.id == data.target_id) {
        return client;
      }
    });
    let live_update = {
      sender_id: data.sender_id,
      live_string: data.live_update
    }
    let target_sock = target[0].socket_id;
    io.to(target_sock).emit('receive:live', live_update);
  });

  socket.on('chat:bomb', function(data) {
    let targets = clients.filter(client => {
      if (client.id == data.sender_id || client.id == data.receiver_id) {
        return client;
      }
    });
    let target_one = targets[0].socket_id;
    let target_two = targets[1].socket_id;
    io.to(target_one).emit('bomb:chat', { chat_id: targets[1].id });
    io.to(target_two).emit('bomb:chat', { chat_id: targets[0].id });
  })

  socket.once('disconnect', function() {
    let index;
    clients.forEach((client, idx) => {
      if (client.socket_id == socket.id) {
        index = idx;
      }
    });
    clients.splice(index, 1);
  });
}
