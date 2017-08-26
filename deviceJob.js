var schedule = require('node-schedule');
const ON = 0, OFF = 1;
const mqttClient = require('./helper/MqttClient');

module.exports.createDeviceOnOffJobs = function(device){
  //Schedule device on job
  device.ruleDeviceOn.minute = device.onTime.minute;
  device.ruleDeviceOn.hour = device.onTime.hour;
  schedule.scheduleJob(device.ruleDeviceOn, function(){
    var msg = 'Aquarium Lights - ' + new Date() + ' ' + device.name + ' turned on';
    console.log(msg);
    device.gpio.writeSync(ON);
    mqttClient.publishAllDeviceState();
  });

  //Schedule device off job
  device.ruleDeviceOff.minute = device.offTime.minute;
  device.ruleDeviceOff.hour = device.offTime.hour;
  schedule.scheduleJob(device.ruleDeviceOff, function(){
    var msg = 'Aquarium Lights - ' + new Date() + ' ' + device.name + ' turned off';
    console.log(msg);
    device.gpio.writeSync(OFF);
    mqttClient.publishAllDeviceState();
  });

  console.log('Aquarium Lights - Jobs for ' + device.name + ' scheduled');
};
