var schedule = require('node-schedule');

module.exports.createDeviceOnOffJobs = function(device){
  //Schedule device on job
  device.ruleDeviceOn.minute = device.onTime.minute;
  device.ruleDeviceOn.hour = device.onTime.hour;
  schedule.scheduleJob(device.ruleDeviceOn, function(){
    console.log('Aquarium Lights - ' + new Date() + ' ' + device.name + ' turned on');
    device.gpio.writeSync(ON);
  });

  //Schedule device off job
  device.ruleDeviceOff.minute = device.offTime.minute;
  device.ruleDeviceOff.hour = device.offTime.hour;
  schedule.scheduleJob(device.ruleDeviceOff, function(){
    console.log('Aquarium Lights - ' + new Date() + ' ' + device.name + ' turned off');
    device.gpio.writeSync(OFF);
  });

  console.log('Aquarium Lights - Jobs for ' + device.name + ' scheduled');
};
