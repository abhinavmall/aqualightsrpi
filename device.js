var ON = 0;
var OFF = 1;

function Device(name, gpio) {
  this.name = name;
  this.gpio = gpio;
}

//Initialize device as per on and off timing
Device.prototype.init = function(switchOnTime, switchOfftime){
  var date = new Date();

  if(date >= switchOnTime && date <= switchOfftime){
    //Activate
    this.gpio.writeSync(ON);
    console.log('Aquarium Lights - ' + date + ' ' + this.name + ' turned on');
  } else {
    this.gpio.writeSync(OFF);
    console.log('Aquarium Lights - ' + date + ' ' + this.name + ' turned off');
  }
};

module.exports = Device;
