from time import sleep
from typing import TextIO
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import time
import requests
from requests import Session
import json
import os
from gpiozero import LightSensor, Buzzer

os.environ["NO_PROXY"] = "127.0.0.1"

reader = SimpleMFRC522()

green_pin = 37
red_pin = 38
rfid_reader = 11
lightsensor_pin = 40

GPIO.setmode(GPIO.BOARD)
GPIO.setwarnings ( False )

GPIO.setup(green_pin,GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(red_pin,GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(rfid_reader,GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(lightsensor_pin, GPIO.IN)

f = open("config_file.json")
hostname = "https://ase-delivery-service.herokuapp.com/boxes" 

session=requests.Session()
box_config = json.load(f)

def light_led(color,sec):
    GPIO.output(color,GPIO.HIGH)
    sleep(sec)
    GPIO.output(color,GPIO.LOW)

def merge(dict1, dict2):
    result = {**dict1, **dict2}
    return result

def httpRequest(method, url, content=""):
    if method == "GET":
        r = session.get(url)
        return r
    elif method == "POST":
        r = session.post(url,json=content)
        return r
    else:
        raise ValueError("Method not found")

def verify_box():
    checklight = GPIO.input(lightsensor_pin)
    sleep(10)
    checklight = GPIO.input(lightsensor_pin)
    print("checklight: ", checklight)
    if checklight == 0: #dark
        light_led(green_pin,2)
        return 1
    else:
        light_led(red_pin,2)
    return 0

#send user id and box data when they try to access the box
def user_authorization():
    try:
        while True:
            print("Scan your card!")
            id, text = reader.read()
            user = {"user_id": text.strip()}
            r = httpRequest("POST", hostname+"/user_authorization", content = merge(box_config, user))
            print(user)
            print(r.text)
            if r.text == "200":
                light_led(green_pin,2)
                sleep(2)
                if verify_box()==1:
                    r = httpRequest("POST", hostname+"/box_closed", content = {**box_config, **user, **{"status_closed":"available"}})
                else:
                    r = httpRequest("POST", hostname+"/box_closed", content = {**box_config, **user, **{"status_closed":"unavailable"}})
                print(r.text)      
            if r.text == "204":
                light_led(red_pin,2)
            time.sleep(2)
    except KeyboardInterrupt:
        print("Scanning interrupted!")

user_authorization()
GPIO.cleanup()

