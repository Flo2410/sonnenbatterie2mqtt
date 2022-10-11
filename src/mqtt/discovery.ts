import cron from "node-cron";
import { Mqtt_Entity_Domain } from "../mqtt/mqtt";
import { MqttEntity } from "./MqttEntity";

export const anounce_all_entities = () => {
  const ip_address_entity = new MqttEntity<number>({
    name: "IP Address",
    unique_id: "ip_address",
    entity_domain: Mqtt_Entity_Domain.NUMBER,
    has_command: true,
    state: 69,
  });

  ip_address_entity.announce();

  const test_sensor_entity = new MqttEntity<{ test: number }>({
    name: "Test Sensor",
    unique_id: "test_sensor",
    entity_domain: Mqtt_Entity_Domain.SENSOR,
    device_class: "power",
    value_template: "{{ value_json.test}}",
    state: { test: 420 },
  });
  test_sensor_entity.announce();

  cron.schedule("* * * * * *", () => {
    test_sensor_entity.update({ test: test_sensor_entity.state.test + 1 });
  });
};
