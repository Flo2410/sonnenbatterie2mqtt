import { Hass_Entity_Domain } from "./hass";

export const MQTT_DEVICE = {
  model: "Sonnenbatterie2mqtt",
  identifiers: "sonnenbatterie2mqtt",
  name: "Sonnenbatterie",
  manufacturer: "Flo2410",
};

export type MqttDevice = typeof MQTT_DEVICE;

export const MQTT_BROKER_URL = "mqtt://localhost:1883";

export const MQTT_TOPIC = "homeassistant";

export enum Mqtt_Function_Topic {
  CONFIG = "config",
  STATE = "state",
  COMMAND = "set",
}

export const mqtt_topic_builder = (
  entity_domain: Hass_Entity_Domain,
  device_id: string,
  function_topic: Mqtt_Function_Topic
): string => `${MQTT_TOPIC}/${entity_domain}/${device_id}/${function_topic}`;

export const mqtt_topics_builder = (entity_domain: Hass_Entity_Domain, device_id: string) => {
  return {
    config: mqtt_topic_builder(entity_domain, device_id, Mqtt_Function_Topic.CONFIG),
    state: mqtt_topic_builder(entity_domain, device_id, Mqtt_Function_Topic.STATE),
    command: mqtt_topic_builder(entity_domain, device_id, Mqtt_Function_Topic.COMMAND),
  };
};
