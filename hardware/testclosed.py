#check if box closed correctly
from time import sleep
from typing import TextIO
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import time
import requests
from gpiozero import LightSensor, Buzzer

reader = SimpleMFRC522()

green_pin = 38
red_pin = 37
lightsensor_pin = 23

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings ( False )

GPIO.setup(green_pin,GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(red_pin,GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(lightsensor_pin, GPIO.IN, pull_up_down=GPIO.PUD_UP)

def light_led(color,sec = 3):
    GPIO.output(color,GPIO.HIGH)
    sleep(sec)
    GPIO.output(color,GPIO.LOW)
    
    
def verify_box():
    try:
        while True:
            if str(GPIO.input(lightsensor_pin)) == "0": # light
                light_led(red_pin)
            else: #dark
                light_led(green_pin)
    except KeyboardInterrupt:
        print("Lightsensor Scanning interrupted!")

verify_box()
