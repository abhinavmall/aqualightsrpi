var schedule = require('node-schedule');
const ON = 0, OFF = 1;
const mqtt = require('mqtt');
const client = mqtt.connect('192.168.1.53:1883');

module.exports.createDeviceOnOffJobs = function(device){
  //Schedule device on job
  device.ruleDeviceOn.minute = device.onTime.minute;
  device.ruleDeviceOn.hour = device.onTime.hour;
  schedule.scheduleJob(device.ruleDeviceOn, function(){
    var msg = 'Aquarium Lights - ' + new Date() + ' ' + device.name + ' turned on';
    console.log(msg);
    device.gpio.writeSync(ON);
    client.publish('aquarium/set', msg)
  });

  //Schedule device off job
  device.ruleDeviceOff.minute = device.offTime.minute;
  device.ruleDeviceOff.hour = device.offTime.hour;
  schedule.scheduleJob(device.ruleDeviceOff, function(){
    var msg = 'Aquarium Lights - ' + new Date() + ' ' + device.name + ' turned off';
    console.log(msg);
    device.gpio.writeSync(OFF);
    client.publish('aquarium/set', msg);
  });

  console.log('Aquarium Lights - Jobs for ' + device.name + ' scheduled');
};
