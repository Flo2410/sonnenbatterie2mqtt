import mqtt, { MqttClient } from "mqtt";

export let mqtt_client: MqttClient;

export const setup_mqtt = () => {
  mqtt_client = mqtt.connect("mqtt://localhost:1883");
};
