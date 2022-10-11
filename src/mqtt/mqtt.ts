import { MqttEntity } from "./MqttEntity";

export const MQTT_BROKER_URL = "mqtt://localhost:1883";

export enum Mqtt_Entity_Domain {
  SENSOR = "sensor",
  NUMBER = "number",
}

export enum Mqtt_Function_Topic {
  CONFIG = "config",
  STATE = "state",
  COMMAND = "set",
}

export const mqtt_topic_builder = (
  entity_domain: Mqtt_Entity_Domain,
  device_id: string,
  function_topic: Mqtt_Function_Topic
): string => `${MqttEntity.MQTT_DEVICE}/${entity_domain}/${device_id}/${function_topic}`;

export const mqtt_topics_builder = (entity_domain: Mqtt_Entity_Domain, device_id: string) => {
  return {
    config_topic: mqtt_topic_builder(entity_domain, device_id, Mqtt_Function_Topic.CONFIG),
    state_topic: mqtt_topic_builder(entity_domain, device_id, Mqtt_Function_Topic.STATE),
    command_topic: mqtt_topic_builder(entity_domain, device_id, Mqtt_Function_Topic.COMMAND),
  };
};
