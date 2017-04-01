var schedule = require('node-schedule');

module.exports.createDeviceOnOffJobs = function(device, ruleDeviceOn, ruleDeviceOff){
  //Schedule device on job
  ruleDeviceOn.minute = device.onTime.minute;
  ruleDeviceOn.hour = device.onTime.hour;
  schedule.scheduleJob(ruleDeviceOn, function(){
    console.log('Aquarium Lights - ' + new Date() + ' ' + device.name + ' turned on');
    device.gpio.writeSync(ON);
  });

  //Schedule device off job
  ruleDeviceOff.minute = device.offTime.minute;
  ruleDeviceOff.hour = device.offTime.hour;
  schedule.scheduleJob(ruleDeviceOff, function(){
    console.log('Aquarium Lights - ' + new Date() + ' ' + device.name + ' turned off');
    device.gpio.writeSync(OFF);
  });

  console.log('Aquarium Lights - Jobs for ' + device.name + ' scheduled');
};
