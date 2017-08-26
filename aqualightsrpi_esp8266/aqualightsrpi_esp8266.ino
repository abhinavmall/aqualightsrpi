#include "config.h"

#include <PubSubClient.h>
#include <ESP8266WiFi.h>

const char* ssid     = CONFIG_WIFI_SSID;
const char* password = CONFIG_WIFI_PASS;
byte mac[6];
const char* mqtt_server = CONFIG_MQTT_HOST;
//IPAddress mqtt_server(192,168,1,53);

WiFiClient wifiClient;
PubSubClient client(wifiClient);

//Topics
const char* aquarium_state = CONFIG_MQTT_TOPIC_STATE;
const char* aquarium_set = CONFIG_MQTT_TOPIC_SET;

const char* client_id = CONFIG_MQTT_CLIENT_ID;

//Pins
int light1_pin = CONFIG_PIN_LIGHT1;
int light2_pin = CONFIG_PIN_LIGHT2;
int pump_pin   = CONFIG_PIN_PUMP;

const char* on_cmd = CONFIG_MQTT_PAYLOAD_ON;
const char* off_cmd = CONFIG_MQTT_PAYLOAD_OFF;

void setup_wifi() {
  // Connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
  WiFi.macAddress(mac);
  Serial.print("MAC: ");
  Serial.print(mac[5],HEX);
  Serial.print(":");
  Serial.print(mac[4],HEX);
  Serial.print(":");
  Serial.print(mac[3],HEX);
  Serial.print(":");
  Serial.print(mac[2],HEX);
  Serial.print(":");
  Serial.print(mac[1],HEX);
  Serial.print(":");
  Serial.println(mac[0],HEX);
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  delay(10);

  setup_wifi();

  //Initialize pins for output
  pinMode(light1_pin, OUTPUT);
  pinMode(light2_pin, OUTPUT);
  pinMode(pump_pin, OUTPUT);
  Serial.println("Pin for lights and pump initialized");
  
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
}

/*
  SAMPLE PAYLOAD:
    {
      "light1": "ON",
      "light2": "OFF",
      "pump": "ON"
    }
  */
void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");

  char message[length + 1];
  for (int i = 0; i < length; i++) {
    message[i] = (char)payload[i];
  }
  message[length] = '\0';
  Serial.println(message);
}

void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect(client_id)) {
      Serial.println("connected");
      client.subscribe(aquarium_set);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void loop() {
  // put your main code here, to run repeatedly:
  if (!client.connected()) {
    if (WiFi.status() != WL_CONNECTED) {
      setup_wifi();
    }
    reconnect();
  }
  client.loop();
}
