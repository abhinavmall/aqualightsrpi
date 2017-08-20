var schedule = require('node-schedule');
var ON = 0, OFF = 1;
const mqtt = require('mqtt');
const client = mqtt.connect('mqtt://192.168.1.53:1883');

function Device(name, gpio, onTime, offTime) {
  this.name = name;
  this.gpio = gpio;
  this.onTime = onTime;
  this.offTime = offTime;
  this.ruleDeviceOn = new schedule.RecurrenceRule();
  this.ruleDeviceOff = new schedule.RecurrenceRule();
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
    var msg = 'Aquarium Lights - ' + date + ' ' + this.name + ' turned on';
    console.log(msg);
    client.publish('aquarium/set', msg);
  } else {
    this.gpio.writeSync(OFF);
    var msg = 'Aquarium Lights - ' + date + ' ' + this.name + ' turned off';
    console.log(msg);
    client.publish('aquarium/set', msg);
  }
};

module.exports = Device;
