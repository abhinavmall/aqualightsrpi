var schedule = require('node-schedule');
var GPIO = require('onoff').Gpio;
var config = require('./config/config.js')
//console.log(config)

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
var light1 = new GPIO(2, 'out');
var light2 = new GPIO(3, 'out');

//Create pump corresponding to GPIO 4
var pump = new GPIO(4, 'out');

var date = new Date();
var hour = date.getHours();

if(hour >= config.ruleLightOne_On.hour && hour <= config.ruleLightOne_Off.hour){
  //Activate light 1
  light1.writeSync(ON);
  console.log('Aquarium Lights - ' + date + ' Light One turned on');
} else {
  light1.writeSync(OFF);
  console.log('Aquarium Lights - ' + date + ' Light One turned off');
}

if(hour >= config.ruleLightTwo_On.hour && hour <= config.ruleLightTwo_Off.hour){
  //Activate light 2
  light2.writeSync(ON);
  console.log('Aquarium Lights - ' + date + ' Light Two turned on');
} else {
  light2.writeSync(OFF);
  console.log('Aquarium Lights - ' + date + ' Light Two turned off');
}

if(hour >= config.rulePump_On.hour && hour <= config.rulePump_Off.hour){
  //Activate light 2
  pump.writeSync(ON);
  console.log('Aquarium Pump - ' + date + ' Filter pump turned on');
} else {
  pump.writeSync(OFF);
  console.log('Aquarium Pump - ' + date + ' Filter pump turned off');
}

console.log('Aquarium lights - Pins activated. Scheduling Jobs');

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
rulePump_Off.minute = config.rulePump_On.minute;
rulePump_Off.hour = config.rulePump_On.hour;
schedule.scheduleJob(rulePump_Off, function(){
  console.log('Aquarium Pump - ' + new Date() + ' Filter pump turned off');
  pump.writeSync(OFF);
});

console.log('Aquarium Lights - Jobs Scheduled');

//process.on('SIGINT', function (){
  //light1.unexport();
  //light2.unexport();
//});
