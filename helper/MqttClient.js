var path = require('path');
const aquarium = require(path.resolve( __dirname, "./Aquarium.js" ));
const mqtt = require('mqtt');
const client = mqtt.connect('192.168.1.53:1883');

exports.publishAllDeviceState = function() {
  var msgJson = {
    'Light One' : aquarium['Light One'].gpio.readSync(),
    'Light Two' : aquarium['Light Two'].gpio.readSync(),
    'Pump' : aquarium['Pump'].gpio.readSync()
  };
  console.log(msgJson)
  client.publish('aquarium/set', msgJson);
  client.publish('aquarium/set', 'sssss');
};
