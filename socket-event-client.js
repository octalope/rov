const Socket = require('socket.io-client');
const os = require('os');

module.exports = () => {
  let socket;

  const clientName = os.hostname + '-' + process.pid;

  const emitEvent = (name, data) => {
    socket.emit(name, data);
  };

  const subscribeEvent = (name, cb) => {
    socket.on(name, (data) => {
      cb(data);
    });
    console.log('subscribed ' + name);
  };

  const registerEvent = (name, options) => {
    return new Promise(resolve => {
      socket.emit('register', {
        name,
        clientName,
        broadcast: options.broadcast
      }, (registeredData) => {
        console.log('registered event ' + name);
        resolve(registeredData);
      });
    });
  };

  const connect = (host) => {
    return new Promise((resolve, reject) => {
      socket = Socket(host, { autoConnect: false });
      socket.on('disconnect', onDisonnect);
      socket.on('error', (err) => reject.bind(err));
      socket.on('connect', () => {
        console.log('Connected');
        resolve();
      });
      socket.open();
    });
  };

  const onDisonnect = () => {
    console.log('Disconnected');
  };

  return {
    connect,
    registerEvent,
    subscribeEvent,
    emitEvent,
    clientName
  };
};

