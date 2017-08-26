var path = require('path');
const aquarium = require(path.resolve( __dirname, "./Aquarium.js" ));
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.1.53:1883');
const ESP8266_INIT = 'ESP8266_INIT';

// Handles restart of ESP8266
client.subscribe('aquarium'); //ESP8266 sends on this topic

client.on('message', function (topic, message) {
  // message is Buffer
  console.log('ESP8266 message received = ' + message);
  if(message == ESP8266_INIT){
    publishAllDeviceState();
    console.log('ESP8266 initialized');
  }
});

var publishAllDeviceState = exports.publishAllDeviceState = function publishAllDeviceState() {
  var msgJson = {
    'Light One' : aquarium['Light One'].gpio.readSync(),
    'Light Two' : aquarium['Light Two'].gpio.readSync(),
    'Pump' : aquarium['Pump'].gpio.readSync()
  };
  // Publish JSON containing states for all devices. State: ON = 0 and OFF = 1
  client.publish('aquarium/set', JSON.stringify(msgJson));
};
