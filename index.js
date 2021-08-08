var path = require('path');
const aquarium = require(path.resolve( __dirname, "./helper/Aquarium.js" ));
var deviceJob = require('./deviceJob.js');
const mqttClient = require('./helper/MqttClient');

//Initialize
aquarium['Light Two'].init();
aquarium['Light One'].init();
aquarium['Pump'].init();
aquarium['Wave Maker'].init();
//aquarium['Power Light'].init();
//aquarium['CO2 Valve'].init();

//Create Jobs
deviceJob.createDeviceOnOffJobs(aquarium['Light Two']);
deviceJob.createDeviceOnOffJobs(aquarium['Light One']);
deviceJob.createDeviceOnOffJobs(aquarium['Pump']);
deviceJob.createDeviceOnOffJobs(aquarium['Wave Maker']);
//deviceJob.createDeviceOnOffJobs(aquarium['Power Light']);
//deviceJob.createDeviceOnOffJobs(aquarium['CO2 Valve']);

//First init message
mqttClient.publishAllDeviceState();
