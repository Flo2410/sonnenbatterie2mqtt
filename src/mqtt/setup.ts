import mqtt, { MqttClient } from "mqtt";

export let mqtt_client: MqttClient;

export const setup_mqtt = () => {
  const url = process.env.MQTT_BROKER_URL ?? "mqtt://localhost:1883";
  mqtt_client = mqtt.connect(url);
};
