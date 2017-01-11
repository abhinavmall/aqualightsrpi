var schedule = require('node-schedule');
var GPIO = require('onoff').Gpio;

//Need four jobs to control on-off operations of two Lights.
var ruleLightOne_On = new schedule.RecurrenceRule();
var ruleLightOne_Off = new schedule.RecurrenceRule();
var ruleLightTwo_On = new schedule.RecurrenceRule();
var ruleLightTwo_Off = new schedule.RecurrenceRule();

//Create two lights corressponding to GPIO 2 & 3
var light1 = new GPIO(2, 'out');
var light2 = new GPIO(3, 'out');

//Light One on at 1000 hrs every day
ruleLightOne_On.minute = 00;
ruleLightOne_On.hour = 10;
schedule.scheduleJob(ruleLightOne_On, function(){
  console.log(new Date() + 'Light One turned on');
  light1.writeSync(0);
});

//Light One off at 2000 hrs every day
ruleLightOne_Off.minute = 00;
ruleLightOne_Off.hour = 20;
schedule.scheduleJob(ruleLightOne_Off, function(){
  console.log(new Date() + 'Light One turned off');
  light1.writeSync(1);
});

//Light Two on at 1200 hrs every day
ruleLightTwo_On.minute = 00;
ruleLightTwo_On.hour = 12;
schedule.scheduleJob(ruleLightTwo_On, function(){
  console.log(new Date() + 'Light Two turned on');
  light2.writeSync(0);
});

//Light Two off at 2200 hrs every day
ruleLightTwo_Off.minute = 00;
ruleLightTwo_Off.hour = 22;
schedule.scheduleJob(ruleLightTwo_Off, function(){
  console.log(new Date() + 'Light Two turned off');
  light2.writeSync(1);
}); 