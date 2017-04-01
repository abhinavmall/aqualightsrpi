var schedule = require('node-schedule');
var GPIO = require('onoff').Gpio;
var config = require('./config/config.js');
var Device = require('./device.js');
var DeviceJob = require('./deviceJob.js');

var ON = 0, OFF = 1;
//Need four jobs to control on-off operations of two Lights.
var ruleLightOne_On = new schedule.RecurrenceRule();
var ruleLightOne_Off = new schedule.RecurrenceRule();
var ruleLightTwo_On = new schedule.RecurrenceRule();
var ruleLightTwo_Off = new schedule.RecurrenceRule();

//Two jobs to control aquarium filter pump
var rulePump_On = new schedule.RecurrenceRule();
var rulePump_Off = new schedule.RecurrenceRule();


//Create two lights corresponding to GPIO 2 & 3
var light1 = new Device('Light One', new GPIO(2, 'out'), config.ruleLightOne_On, config.ruleLightOne_Off);
var light2 = new Device('Light Two', new GPIO(3, 'out'), config.ruleLightTwo_On, config.ruleLightTwo_Off);

//Create pump corresponding to GPIO 4
var pump = new Device('Pump', new GPIO(4, 'out'), config.rulePump_On, config.rulePump_Off);

light1.init();
light2.init();
pump.init();

DeviceJob.createDeviceOnOffJobs(light1, ruleLightOne_On, ruleLightOne_Off);
DeviceJob.createDeviceOnOffJobs(light2, ruleLightTwo_On, ruleLightTwo_Off);
DeviceJob.createDeviceOnOffJobs(pump, rulePump_On, rulePump_Off);
