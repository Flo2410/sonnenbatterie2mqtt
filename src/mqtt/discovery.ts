import { mqtt_client } from "./setup";

const DEVICE = {
  model: "Sonnenbatterie2mqtt",
  identifiers: "sonnenbatterie2mqtt",
  name: "Sonnenbatterie",
  manufacturer: "Flo2410",
};

export const discover_ip_setting = () => {
  const payload = {
    name: "IP Address",
    device: DEVICE,
    unique_id: "ip_address",
    command_topic: "homeassistant/number/sonnenbatterie_ip/set",
    state_topic: "homeassistant/number/sonnenbatterie_ip/state",
  };
  mqtt_client.publish("homeassistant/number/sonnenbatterie_ip/config", JSON.stringify(payload), {
    retain: true,
  });

  mqtt_client.publish("homeassistant/number/sonnenbatterie_ip/state", "69");
};

export const discover_test_sensor = () => {
  const payload = {
    name: "Test Sensor",
    device: DEVICE,
    unique_id: "test_sensor",
    device_class: "power",
    value_template: "{{ value_json.test}}",
    state_topic: "homeassistant/sensor/test_sensor/state",
  };
  mqtt_client.publish("homeassistant/sensor/test_sensor/config", JSON.stringify(payload), {
    retain: true,
  });

  mqtt_client.publish("homeassistant/sensor/test_sensor/state", JSON.stringify({ test: 420 }));
};
