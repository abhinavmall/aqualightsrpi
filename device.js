const schedule = require('node-schedule');
const ON = 0, OFF = 1;

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
    console.log('Aquarium Lights - ' + date + ' ' + this.name + ' turned on');
  } else {
    //Turn Off
    this.gpio.writeSync(OFF);
    console.log('Aquarium Lights - ' + date + ' ' + this.name + ' turned off');
  }
};

module.exports = Device;
