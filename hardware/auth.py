from time import sleep
from typing import TextIO
import RPi.GPIO as GPIO
from mfrc522 import SimpleMFRC522
import time
import requests
from requests import Session
import json
import os

os.environ["NO_PROXY"] = "127.0.0.1"

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

f = open("config_file.json")
hostname = "https://ase-discovery-server.herokuapp.com/eureka" #ase-delivery-eureka...
hostURL = "http://httpbin.org/post" #this one is for testing

session=requests.Session()
box_config = json.load(f)

def light_led(color,sec = 3):
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

#send user id and box data when they try to access the box
def user_authorization():
    try:
        while True:
            print("Scan your card!")
            id, text = reader.read()
            print(text)
            user = {"user_id": str(text)}
            r = httpRequest("POST", hostURL, content = merge(box_config, user))
            #r = httpRequest("POST", hostname+"/user_authorization", content = merge(box_config, user))
            print(r.text)
            if r.status_code == "200":
                light_led(green_pin)
            else:
                if r.status_code == "204":
                    light_led(red_pin)
            time.sleep(5)
    except KeyboardInterrupt:
        print("Scanning interrupted!")

user_authorization()
GPIO.cleanup()

