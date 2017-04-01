var schedule = require('node-schedule');
var GPIO = require('onoff').Gpio;
var config = require('./config/config.js');
var Device = require('./device.js');

//Need four jobs to control on-off operations of two Lights.
var ruleLightOne_On = new schedule.RecurrenceRule();
var ruleLightOne_Off = new schedule.RecurrenceRule();
var ruleLightTwo_On = new schedule.RecurrenceRule();
var ruleLightTwo_Off = new schedule.RecurrenceRule();

//Two jobs to control aquarium filter pump
var rulePump_On = new schedule.RecurrenceRule();
var rulePump_Off = new schedule.RecurrenceRule();

var ON = 0, OFF = 1;

//Create two lights corresponding to GPIO 2 & 3
var light1 = new Device('Light One', new GPIO(2, 'out'), config.ruleLightOne_On, config.ruleLightOne_Off);
var light2 = new Device('Light Two', new GPIO(3, 'out'), config.ruleLightTwo_On, config.ruleLightTwo_Off);

//Create pump corresponding to GPIO 4
var pump = new Device('Pump', new GPIO(4, 'out'), config.rulePump_On, config.rulePump_Off);

light1.init();
light2.init();
pump.init();

this.createDeviceOnOffJobs = function(device, ruleDeviceOn, ruleDeviceOff){
  //Schedule device on job
  ruleDeviceOn.minute = device.onTime.minute;
  ruleDeviceOn.hour = device.onTime.hour;
  schedule.scheduleJob(ruleDeviceOn, function(){
    console.log('Aquarium Lights - ' + new Date() + ' ' + device.name + ' turned on');
    device.gpio.writeSync(ON);
  });

  //Schedule device on job
  ruleDeviceOff.minute = device.offTime.minute;
  ruleDeviceOff.hour = device.offTime.hour;
  schedule.scheduleJob(ruleDeviceOff, function(){
    console.log('Aquarium Lights - ' + new Date() + ' ' + device.name + ' turned off');
    device.gpio.writeSync(OFF);
  });

  console.log('Aquarium Lights - Jobs for ' + device.name + ' scheduled');
};

this.createDeviceOnOffJobs(light1, ruleLightOne_On, ruleLightOne_Off);
this.createDeviceOnOffJobs(light2, ruleLightTwo_On, ruleLightTwo_Off);
this.createDeviceOnOffJobs(pump, rulePump_On, rulePump_Off);
