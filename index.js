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

var ON = 0;
var OFF = 1;


//Create two lights corresponding to GPIO 2 & 3
var light1 = new Device('Light One', new GPIO(2, 'out'), config.ruleLightOne_On, config.ruleLightOne_Off);
var light2 = new Device('Light Two', new GPIO(3, 'out'), config.ruleLightTwo_On, config.ruleLightTwo_Off);

//Create pump corresponding to GPIO 4
var pump = new Device('Pump', new GPIO(4, 'out'), config.rulePump_On, config.rulePump_Off);
/*
//Schedule of lights and pump
var lightOneOn = new Date();
lightOneOn.setHours(config.ruleLightOne_On.hour, config.ruleLightOne_On.minute, 0);
var lightOneOff = new Date();
lightOneOff.setHours(config.ruleLightOne_Off.hour, config.ruleLightOne_Off.minute, 0);
var lightTwoOn = new Date();
lightTwoOn.setHours(config.ruleLightTwo_On.hour, config.ruleLightTwo_On.minute, 0);
var lightTwoOff = new Date();
lightTwoOff.setHours(config.ruleLightTwo_Off.hour, config.ruleLightTwo_Off.minute, 0);
var pumpOn = new Date();
pumpOn.setHours(config.rulePump_On.hour, config.rulePump_On.minute, 0);
var pumpOff = new Date();
pumpOff.setHours(config.rulePump_Off.hour, config.rulePump_Off.minute, 0);
*/
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

//console.log('Aquarium lights - Pins activated. Scheduling Jobs');
/*
//Light One on at 1000 hrs every day
ruleLightOne_On.minute = config.ruleLightOne_On.minute;
ruleLightOne_On.hour = config.ruleLightOne_On.hour;
schedule.scheduleJob(ruleLightOne_On, function(){
  console.log('Aquarium Lights - ' + new Date() + ' Light One turned on');
  light1.writeSync(ON);
});

//Light One off at 2000 hrs every day
ruleLightOne_Off.minute = config.ruleLightOne_Off.minute;
ruleLightOne_Off.hour = config.ruleLightOne_Off.hour;
schedule.scheduleJob(ruleLightOne_Off, function(){
  console.log('Aquarium Lights - ' + new Date() + ' Light One turned off');
  light1.writeSync(OFF);
});

//Light Two on at 1200 hrs every day
ruleLightTwo_On.minute = config.ruleLightTwo_On.minute;
ruleLightTwo_On.hour = config.ruleLightTwo_On.hour;
schedule.scheduleJob(ruleLightTwo_On, function(){
  console.log('Aquarium Lights - ' + new Date() + ' Light Two turned on');
  light2.writeSync(ON);
});

//Light Two off at 2200 hrs every day
ruleLightTwo_Off.minute = config.ruleLightTwo_Off.minute;
ruleLightTwo_Off.hour = config.ruleLightTwo_Off.hour;
schedule.scheduleJob(ruleLightTwo_Off, function(){
  console.log('Aquarium Lights - ' + new Date() + ' Light Two turned off');
  light2.writeSync(OFF);
});

//Pump turned on at 1000 hrs every day
rulePump_On.minute = config.rulePump_On.minute;
rulePump_On.hour = config.rulePump_On.hour;
schedule.scheduleJob(rulePump_On, function(){
  console.log('Aquarium Pump - ' + new Date() + ' Filter pump turned on');
  pump.writeSync(ON);
});

//Pump turned off at 2200 hrs every day
rulePump_Off.minute = config.rulePump_Off.minute;
rulePump_Off.hour = config.rulePump_Off.hour;
schedule.scheduleJob(rulePump_Off, function(){
  console.log('Aquarium Pump - ' + new Date() + ' Filter pump turned off');
  pump.writeSync(OFF);
});

console.log('Aquarium Lights - Jobs Scheduled');
*/
//process.on('SIGINT', function (){
  //light1.unexport();
  //light2.unexport();
//});
