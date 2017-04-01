//var schedule = require('node-schedule');

var ON = 0, OFF = 1;

function Device(name, gpio, onTime, offTime) {
  this.name = name;
  this.gpio = gpio;
  this.onTime = onTime;
  this.offTime = offTime;
  //this.ruleDeviceOn = new schedule.RecurrenceRule();
  //this.ruleDeviceOff = new schedule.RecurrenceRule();
}

//Initialize device as per on and off timing
Device.prototype.init = function(){
  //Current time
  var date = new Date();

  //Device Activate time
  var switchOnTime = new Date();
  switchOnTime.setHours(this.onTime.hour, this.onTime.minute, 0);

  var switchOffTime = new Date();
  switchOffTime.setHours(this.offTime.hour, this.offTime.minute, 0);

  if(date >= switchOnTime && date <= switchOffTime){
    //Activate
    this.gpio.writeSync(ON);
    console.log('Aquarium Lights - ' + date + ' ' + this.name + ' turned on');
  } else {
    this.gpio.writeSync(OFF);
    console.log('Aquarium Lights - ' + date + ' ' + this.name + ' turned off');
  }
};

//Create device on and off recurrence rule
/*
Device.prototype.createDeviceOnOffJobs = function(){
  //Schedule device on job
  this.ruleDeviceOn.minute = this.onTime.minute;
  this.ruleDeviceOn.hour = this.onTime.hour;
  schedule.scheduleJob(this.ruleDeviceOn, function(this){
    console.log('Aquarium Lights - ' + new Date() + ' ' + this.name + ' turned on');
    this.gpio.writeSync(ON);
  });

  //Schedule device off job
  this.ruleDeviceOff.minute = this.offTime.minute;
  this.ruleDeviceOff.hour = this.offTime.hour;
  schedule.scheduleJob(this.ruleDeviceOff, function(this){
    console.log('Aquarium Lights - ' + new Date() + ' ' + this.name + ' turned off');
    this.gpio.writeSync(OFF);
  });

  console.log('Aquarium Lights - Jobs for ' + this.name + ' scheduled');
};
*/
module.exports = Device;
