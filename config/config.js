var config = {}

config.ruleLightOne_On = {}
config.ruleLightOne_Off = {}
config.ruleLightTwo_On = {}
config.ruleLightTwo_Off = {}
config.rulePump_On = {};
config.rulePump_Off = {};

config.ruleLightOne_On.minute = 00;
config.ruleLightOne_On.hour = 09;

config.ruleLightOne_Off.minute = 00;
config.ruleLightOne_Off.hour = 19;

config.ruleLightTwo_On.minute = 00;
config.ruleLightTwo_On.hour = 11;

config.ruleLightTwo_Off.minute = 00;
config.ruleLightTwo_Off.hour = 21;

config.rulePump_On.minute = 01;
config.rulePump_On.hour = 00;

config.rulePump_Off.minute = 59;
config.rulePump_Off.hour = 23;

module.exports = config;
