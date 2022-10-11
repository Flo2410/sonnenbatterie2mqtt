import cron from "node-cron";
import { Hass_Device_Class } from "types/hass.type";
import { Mqtt_Entity_Domain, mqtt_topics_builder } from "./mqtt";
import { mqtt_client } from "./setup";

export interface IMqttDevice {
  name: string;
  model: string;
  identifiers: string;
  manufacturer: string;
}

export interface IMqttEntity<T> {
  name: string;
  unique_id: string;
  entity_domain: Mqtt_Entity_Domain;

  device: IMqttDevice;

  config_topic: string;
  state_topic: string;
  command_topic?: string;

  device_class?: Hass_Device_Class;
  unit_of_measurement?: string;
  value_template?: string;
  charging_template?: string;

  state: T;
  has_command?: boolean;
}

export type IMqttEntityParams<T> = Omit<
  IMqttEntity<T>,
  "device" | "config_topic" | "state_topic" | "command_topic" | "state"
>;

export type IMqttEntityConfig<T> = Omit<
  IMqttEntity<T>,
  "entity_domain" | "config_topic" | "state" | "has_command"
>;

export class MqttEntity<T = number> implements IMqttEntity<T> {
  static readonly MQTT_DEVICE: IMqttDevice = {
    name: "Sonnenbatterie",
    model: "Sonnenbatterie2mqtt",
    identifiers: "sonnenbatterie2mqtt",
    manufacturer: "Flo2410",
  };

  static readonly MQTT_TOPIC = "homeassistant";

  name: string;
  unique_id: string;
  entity_domain: Mqtt_Entity_Domain;

  device = MqttEntity.MQTT_DEVICE;

  config_topic: string;
  state_topic: string;
  command_topic?: string;

  device_class?: Hass_Device_Class;
  unit_of_measurement?: string;
  value_template?: string;
  charging_template?: string;

  state!: T;
  has_command?: boolean;

  constructor({
    name,
    unique_id,
    entity_domain,
    has_command,
    device_class,
    unit_of_measurement,
    value_template,
  }: IMqttEntityParams<T>) {
    this.name = name;
    this.unique_id = unique_id;
    this.entity_domain = entity_domain;
    this.device_class = device_class;
    this.unit_of_measurement = unit_of_measurement;
    this.value_template = value_template;

    const { config_topic, state_topic, command_topic } = mqtt_topics_builder(
      this.entity_domain,
      this.unique_id
    );
    this.config_topic = config_topic;
    this.state_topic = state_topic;
    if (has_command) this.command_topic = command_topic;
  }

  public announce() {
    mqtt_client.publish(this.config_topic, JSON.stringify(this.config), {
      retain: true,
    });
  }

  public update(data: T) {
    const data_str = typeof data === "string" ? data : JSON.stringify(data);
    console.log(`Updating state of "${this.name}" to be: ${data_str}`);

    mqtt_client.publish(this.state_topic, data_str, (err) => {
      if (!err) this.state = data;
    });
  }

  public async register_update(value: () => Promise<T>) {
    this.update(await value());

    cron.schedule("*/10 * * * * *", async () => {
      this.update(await value());
    });
  }

  public get config(): IMqttEntityConfig<T> {
    return {
      name: this.name,
      unique_id: this.unique_id,
      device: MqttEntity.MQTT_DEVICE,
      state_topic: this.state_topic,
      command_topic: this.command_topic,
      device_class: this.device_class,
      unit_of_measurement: this.unit_of_measurement,
      value_template: this.value_template,
    };
  }
}
