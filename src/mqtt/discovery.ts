import { MqttClient } from "mqtt";
import {
  HassConfigBuilderReturnProp,
  hass_config_builder,
  Hass_Entity_Domain,
} from "../config/hass";
import { mqtt_client } from "./setup";

export const discover_ip_setting = () => {
  const config_and_topic = hass_config_builder({
    name: "IP Address",
    unique_id: "ip_address",
    entity_domain: Hass_Entity_Domain.NUMBER,
    include_command_topic: true,
  });

  discover(config_and_topic).publish(config_and_topic.config.state_topic, "69");
};

export const discover_test_sensor = () => {
  const config_and_topic = hass_config_builder({
    name: "Test Sensor",
    unique_id: "test_sensor",
    entity_domain: Hass_Entity_Domain.SENSOR,
    device_class: "power",
    value_template: "{{ value_json.test}}",
  });

  discover(config_and_topic).publish(
    config_and_topic.config.state_topic,
    JSON.stringify({ test: 420 })
  );
};

export const discover = (hass_config_builder: HassConfigBuilderReturnProp): MqttClient => {
  return mqtt_client.publish(
    hass_config_builder.config_topic,
    JSON.stringify(hass_config_builder.config),
    {
      retain: true,
    }
  );
};
