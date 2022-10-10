import { MqttDevice, MQTT_DEVICE, mqtt_topics_builder } from "./mqtt";

export enum Hass_Entity_Domain {
  SENSOR = "sensor",
  NUMBER = "number",
}

export interface HassConfig {
  name: string;
  entity_domain: Hass_Entity_Domain;
  unique_id: string;

  device: MqttDevice;
  state_topic: string;

  command_topic?: string;

  device_class?: string;
  unit_of_measurement?: string;
  value_template?: string;
}

export type HassConfigBuilderProps = Omit<
  HassConfig,
  "device" | "state_topic" | "command_topic"
> & {
  include_command_topic?: boolean;
};

export interface HassConfigBuilderReturnProp {
  config: HassConfig;
  config_topic: string;
}

export const hass_config_builder = ({
  include_command_topic = false,
  ...input_config
}: HassConfigBuilderProps): HassConfigBuilderReturnProp => {
  const {
    config: config_topic,
    state,
    command,
  } = mqtt_topics_builder(input_config.entity_domain, input_config.unique_id);

  const config: HassConfig = {
    ...input_config,
    ...{
      device: MQTT_DEVICE,
      state_topic: state,
    },
  };
  if (include_command_topic) config.command_topic = command;

  return { config, config_topic };
};
