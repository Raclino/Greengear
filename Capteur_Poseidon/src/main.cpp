#include <SPI.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "heltec.h"

const char *ssid = "GreenGearHub";
const char *password = "greenzeus";

const char *token = "f41a4822e8e367e7fc6955a1058eeb9a";

const char *mqtt_server = "192.168.2.1";

const int buttonPin = 0;

int connectStatus = 0;
float humidity = 50.0;

WiFiClient espClient;
PubSubClient client(espClient);

void setup_wifi();
void reconnect();

void setup()
{
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  reconnect();
}

void setup_wifi()
{
  delay(10);
  WiFi.begin(ssid, password);

  Serial.println("");
  while (WiFi.status() != WL_CONNECTED)
  {
    delay(500);
    Serial.print("Connexion status attendu ");
    Serial.print(WL_CONNECTED);
    Serial.print(" : ");
    Serial.println(WiFi.status());
  }
  Serial.println("Connecté au WiFi");
  Serial.print("Adresse IP: ");
  Serial.println(WiFi.localIP());

  Serial.println("");
}

void reconnect()
{
  while (!client.connected())
  {
    Serial.print("Tentative de connexion MQTT...");
    if (client.connect("clientID"))
    {
      Serial.println("connecté");
    }
    else
    {
      Serial.print("échec, rc=");
      Serial.print(client.state());
      Serial.println(" nouvelle tentative dans 5 secondes");
      delay(5000);
    }
  }
}

void loop()
{
  if (!client.connected())
  {
    reconnect();
  }
  client.loop();
  if (connectStatus == 1)
  {
    float change = random(-500, 500) / 100.0;
    humidity += change;

    if (humidity < 0)
    {
      humidity = 0;
    }
    else if (humidity > 100)
    {
      humidity = 100;
    }

    String humidityStr = String(humidity, 2);
    client.publish("capteur/humidite", humidityStr.c_str());
    delay(5000);
  }
  else
  {
    if (digitalRead(buttonPin) == LOW)
    {
      delay(50);
      if (digitalRead(buttonPin) == LOW)
      {
        while (digitalRead(buttonPin) == LOW)
          ; // Attend que le bouton soit relâché
        Serial.println("Bouton pressé, envoi du message.");
        client.publish("connect/token", token);
        connectStatus = 1;
      }
    }
  }
  delay(10);
}
