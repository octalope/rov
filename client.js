const SocketEventClient = require('./socket-event-client');
const config = require('./config.json');

const client = SocketEventClient();
const url = `http://${config.host}:${config.port}`;
console.log(`Connecting to controller at ${url}`);
client.connect(url);

client.subscribeEvent('gamepadAxis', (data) => {
    console.log(`gamepadAxis: ${JSON.stringify(data)}`);
});

client.subscribeEvent('gamepadButton', (data) => {
    console.log(`gamepadButton: ${JSON.stringify(data)}`);
});


