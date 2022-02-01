from time import sleep
from typing import TextIO
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import time
import requests
import json
from gpiozero import LightSensor, Buzzer
from flask import Flask, jsonify

reader = SimpleMFRC522()

green_pin = 38
red_pin = 37
lightsensor_pin = 23
rfid_reader = 11 

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings ( False )

GPIO.setup(green_pin,GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(red_pin,GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(rfid_reader,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(lightsensor_pin, GPIO.IN)

app = Flask(__name__)

config = {
        "DEBUG": True
    }

f = open("config_file.json")

box_config = json.load(f)
#print(box_config)
app.config.from_mapping(config)


def light_led(color,sec = 3):
    GPIO.output(color,GPIO.HIGH)
    sleep(sec)
    GPIO.output(color,GPIO.LOW)

def merge(dict1, dict2):
    result = {**dict1, **dict2}
    return result

#send the info of the config file of the box
@app.route("/boxconfig", methods = ["GET","POST"])
def show_box_config():
    return json.dumps(box_config)

#send user id and box data when they try to access the box
@app.route("/verify_authorization", methods = ["GET","POST"])
def user_authorization():
    print("Scan your card!")
    id, text = reader.read()
    user = {"user_id": str(text)}
    print(user)
    return json.dumps(merge(box_config, user))

#check if box status changed -> check if closed correct
@app.route("/status_changed/<string:ischanged>",  methods = ["GET","POST"])
def verify_box(ischanged):
    if ischanged=="true":
        if str(GPIO.input(lightsensor_pin)) == "0": # dark
            light_led(green_pin)
            return "closed"
        else: #light
            light_led(red_pin)
            return "error"
    return "closed"
    
app.run(port=8000)
