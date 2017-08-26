var path = require('path');
const aquarium = require(path.resolve( __dirname, "./helper/Aquarium.js" ));
var deviceJob = require('./deviceJob.js');
const mqttClient = require('./helper/MqttClient');

//Initialize
aquarium['Light Two'].init();
aquarium['Light One'].init();
aquarium['Pump'].init();

//Create Jobs
deviceJob.createDeviceOnOffJobs(aquarium['Light Two']);
deviceJob.createDeviceOnOffJobs(aquarium['Light One']);
deviceJob.createDeviceOnOffJobs(aquarium['Pump']);

//First init message
mqttClient.publishAllDeviceState();
