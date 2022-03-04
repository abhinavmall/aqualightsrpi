#!/usr/bin/python
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

# init list with pin numbers

pinList = [17, 22, 23, 24, 27, 25, 5, 6, 26]

# loop through pins and set mode and state to 'low'

for i in pinList:
  GPIO.setup(i, GPIO.OUT)
  GPIO.output(i, GPIO.HIGH)

# time to sleep between operations in the main loop

SleepTimeL = 2

# main loop

try:
  GPIO.output(17, GPIO.LOW)
  print "ONE"
  time.sleep(SleepTimeL);
  GPIO.output(23, GPIO.LOW)
  print "TWO"
  time.sleep(SleepTimeL);
  GPIO.cleanup()
  print "Good bye!"

# End program cleanly with keyboard
except KeyboardInterrupt:
  print " Quit"

  # Reset GPIO settings
  GPIO.cleanup()
