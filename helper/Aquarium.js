const GPIO = require('onoff').Gpio;
const config = require('../config/config.js');
const Device = require('../device.js');

//Create two lights corresponding to GPIO 23 & 24
const light1 = new Device('Light One', new GPIO(14, 'out'), config.ruleLightOne_On, config.ruleLightOne_Off);
const light2 = new Device('Light Two', new GPIO(15, 'out'), config.ruleLightTwo_On, config.ruleLightTwo_Off);

//Create pump corresponding to GPIO 25
const pump = new Device('Pump', new GPIO(18, 'out'), config.rulePump_On, config.rulePump_Off);

//Create wavemaker corresponding to 8
const wavemaker = new Device('Wave Maker', new GPIO(23, 'out'), config.ruleWaveMaker_On, config.ruleWaveMaker_Off);

//Create highpower light corresponding to 22
//const powerLight = new Device('Power Light', new GPIO(22, 'out'), config.rulePowerLight_On, config.rulePowerLight_Off);

//Create co2 valve corresponding to 10
//const co2Valve = new Device('CO2 Valve', new GPIO(10, 'out'), config.ruleCO2Valve_On, config.ruleCO2Valve_Off);

const aquarium = { };
aquarium[light1.name] = light1;
aquarium[light2.name] = light2;
aquarium[pump.name] = pump;
aquarium[wavemaker.name] = wavemaker;
//aquarium[powerLight.name] = powerLight;
//aquarium[co2Valve.name] = co2Valve;

module.exports = aquarium;
