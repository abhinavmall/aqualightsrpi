# aqualightsrpi

Aquarium Lights management using Raspberry Pi 3 and a 8 channel relay.

A Node.js project to automate lights of my freshwater planted aquarium. Uses "onoff - https://github.com/fivdi/onoff" for GPIO access. Using "pm2@2.0.0 - http://pm2.keymetrics.io" for process management (restart/reload).

Automation was necessary so as to ensure adequate light for all the plants as well as control algae growth owing to excess light. Currently controlling two lights & filter pump but planning to control CO2 release valve too. Looking for appropriate hardware.

## Update
Raspberry Pi 3 is way too powerful for this application, so I have decided to use a NodeMCU Lolin v3 ESP8266 board. It has wifi and ample GPIO for my use case. I am using MQTT wherein my RPi would publish message to change state of lights and pump.
Using a local Mosquitto broker running on RPi.

### User Stories - ESP8266:
* [x] It should be able to connect and reconnect to WiFi.
* [x] It should be able to connect and reconnect to mosquitto broker running on Raspberry Pi (Local Network).
* [x] It should be able to get latest device state and initialize itself if restarted due to any reason (Power loss, etc.).
* [ ] Aquarium pumps and lights to be connected to ESP8266 (Currently connected to Raspberry Pi). #ManualTask
* [ ] It should be able to parse JSON message and deduce state of all devices.
* [ ] It should be able to change state of pins 12, 13 & 14 as per state message.
