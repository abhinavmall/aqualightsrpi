var config = {}

config.ruleLightOne_On = {}
config.ruleLightOne_Off = {}
config.ruleLightTwo_On = {}
config.ruleLightTwo_Off = {}
config.rulePump_On = {};
config.rulePump_Off = {};
config.ruleWaveMaker_On = {};
config.ruleWaveMaker_Off = {};
config.rulePowerLight_On = {};
config.rulePowerLight_Off = {};
config.ruleCO2Valve_On = {};
config.ruleCO2Valve_Off = {};

config.ruleLightOne_On.minute = 00;
config.ruleLightOne_On.hour = 08;

config.ruleLightOne_Off.minute = 00;
config.ruleLightOne_Off.hour = 18;

config.ruleLightTwo_On.minute = 00;
config.ruleLightTwo_On.hour = 08;

config.ruleLightTwo_Off.minute = 00;
config.ruleLightTwo_Off.hour = 18;

config.rulePump_On.minute = 01;
config.rulePump_On.hour = 00;

config.rulePump_Off.minute = 59;
config.rulePump_Off.hour = 23;

config.ruleWaveMaker_On.minute = 00;
config.ruleWaveMaker_On.hour = 11;

config.ruleWaveMaker_Off.minute = 00;
config.ruleWaveMaker_Off.hour = 07;

config.rulePowerLight_On.minute = 00;
config.rulePowerLight_On.hour = 08;

config.rulePowerLight_Off.minute = 00;
config.rulePowerLight_Off.hour = 18;

config.ruleCO2Valve_On.minute = 00;
config.ruleCO2Valve_On.hour = 10;

config.ruleCO2Valve_Off.minute = 00;
config.ruleCO2Valve_Off.hour = 20;

module.exports = config;
