var schedule = require('node-schedule')

// Need four jobs to control on-off operations of two Lights.
var ruleLightOne_On = new schedule.RecurrenceRule();
var ruleLightOne_Off = new schedule.RecurrenceRule();
var ruleLightTwo_On = new schedule.RecurrenceRule();
var ruleLightTwo_Off = new schedule.RecurrenceRule();

//Light One on at 1000 hrs every day
ruleLightOne_On.minute = 00;
ruleLightOne_On.hour = 10;
schedule.scheduleJob(ruleLightOne_On, function(){
  console.log(new Date() + 'Light One turned on');
});

//Light One off at 2000 hrs every day
ruleLightOne_Off.minute = 00;
ruleLightOne_Off.hour = 20;
schedule.scheduleJob(ruleLightOne_Off, function(){
  console.log(new Date() + 'Light One turned off');
});

//Light Two on at 1200 hrs every day
ruleLightTwo_On.minute = 00;
ruleLightTwo_On.hour = 12;
schedule.scheduleJob(ruleLightTwo_On, function(){
  console.log(new Date() + 'Light Two turned on');
});

//Light Two off at 2200 hrs every day
ruleLightTwo_Off.minute = 00;
ruleLightTwo_Off.hour = 22;
schedule.scheduleJob(ruleLightTwo_Off, function(){
  console.log(new Date() + 'Light Two turned off');
});
