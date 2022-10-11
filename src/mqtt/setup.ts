import { MQTT_BROKER_URL } from "./mqtt";
import mqtt, { MqttClient } from "mqtt";

export let mqtt_client: MqttClient;

export const setup_mqtt = () => {
  mqtt_client = mqtt.connect(MQTT_BROKER_URL);
};
