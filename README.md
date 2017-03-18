# aqualightsrpi

Aquarium Lights management using Raspberry Pi 3 and a 8 channel relay.

A Node.js project to automate lights of my freshwater planted aquarium. Uses "onoff - https://github.com/fivdi/onoff" for GPIO access.

Automation was necessary so as to ensure aqequate light for all the plants as well as control algae growth owing to excess light. Currently controlling two lights but planning to control filter pump & CO2 release valve too. Looking for appropriate hardware.

Note: Using following command in rc.local to run the application in case of RaspberryPi reset due to any reason - __su pi -c 'node /home/pi/Downloads/aqualightsrpi/index.js < /dev/null &'__
