const GPIO = require('onoff').Gpio;
const config = require('../config/config.js');
const Device = require('../device.js');

//Create two lights corresponding to GPIO 2 & 3
const light1 = new Device('Light One', new GPIO(2, 'out'), config.ruleLightOne_On, config.ruleLightOne_Off);
const light2 = new Device('Light Two', new GPIO(3, 'out'), config.ruleLightTwo_On, config.ruleLightTwo_Off);

//Create pump corresponding to GPIO 4
const pump = new Device('Pump', new GPIO(4, 'out'), config.rulePump_On, config.rulePump_Off);

const aquarium = { };
aquarium[light1.name] = light1;
aquarium[light2.name] = light2;
aquarium[pump.name] = pump;

module.exports = aquarium;
