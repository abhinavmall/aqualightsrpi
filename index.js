var path = require('path');
const aquarium = require(path.resolve( __dirname, "./helper/Aquarium.js" ));
var deviceJob = require('./deviceJob.js');
const mqttClient = require('./helper/MqttClient');

aquarium['Light Two'].init();
aquarium['Light One'].init();
aquarium['Pump'].init();

deviceJob.createDeviceOnOffJobs(aquarium['Light Two']);
deviceJob.createDeviceOnOffJobs(aquarium['Light One']);
deviceJob.createDeviceOnOffJobs(aquarium['Pump']);

mqttClient.publishAllDeviceState();
