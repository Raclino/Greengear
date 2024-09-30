import paho.mqtt.client as mqtt
import requests
import yaml
import sys
import signal

with open('config.yaml', 'r') as file:
    config = yaml.safe_load(file)

Api = config['API_ADDRESS']
Hub = config['HUB']

sensors = [{"type":"humidity","unity": "%","token":""}]

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))
    for topic in config['mqtt']['topics']:
        client.subscribe(topic)

def on_message(client, userdata, msg):
    print(f"Message reçu sur {msg.topic}: {msg.payload.decode()}")

    if msg.topic == "connect/token":
        data = {
            "sensor_token": msg.payload.decode(),
            "hub_token": Hub["TOKEN"]
        }
        sensors[0]["token"] = msg.payload.decode()
        requests.post(Api+"connect-sensor-to-hub", json=data)
    if msg.topic == "capteur/humidite":
        sensor_data = msg.payload.decode()
        data={
             "data_type": sensors[0]["type"],
             "unity": sensors[0]["unity"],
             "data": sensor_data,
             "sensor_token": sensors[0]["token"]
        }
        requests.post(Api+"sensorData", json=data)

def signal_handler(signal, frame):
        print('Disconnecting...')
        client.disconnect()
        sys.exit(0)

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

mqtt_config = config['mqtt']
client.connect(mqtt_config['host'], mqtt_config['port'], 60)

client.loop_forever()

signal.signal(signal.SIGINT, signal_handler)
