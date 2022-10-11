import { SonnenbatterieOperattingMode, SonnenbatterieParameter } from "./types/sonnenbatterie.type";
import { HttpSensor } from "./http/HttpSensor";
import { Mqtt_Entity_Domain } from "./mqtt/mqtt";
import { MqttEntity } from "./mqtt/MqttEntity";
import { Hass_Device_Class } from "./types/hass.type";

const NAME_PREFIX = "Sonnenbatterie";
const UNIQUE_ID_PREFIX = "sonnenbatterie_";

export const announce_and_register_update = (mqtt_entity: MqttEntity, http_sensor: HttpSensor) => {
  mqtt_entity.announce();
  mqtt_entity.register_update(async () => {
    return await http_sensor.value();
  });
};

export const setup = () => {
  // POWER_GENERATION
  announce_and_register_update(
    new MqttEntity({
      name: `${NAME_PREFIX} Leistung Erzeuger`,
      unique_id: `${UNIQUE_ID_PREFIX}power_generation`,
      entity_domain: Mqtt_Entity_Domain.SENSOR,
      device_class: Hass_Device_Class.POWER,
      unit_of_measurement: "W",
    }),
    new HttpSensor({
      sensor_parameter: SonnenbatterieParameter.POWER_GENERATION,
    })
  );

  // POWER_CONSUMPTION
  announce_and_register_update(
    new MqttEntity({
      name: `${NAME_PREFIX} Leistung Verbraucher`,
      unique_id: `${UNIQUE_ID_PREFIX}power_consumption`,
      entity_domain: Mqtt_Entity_Domain.SENSOR,
      device_class: Hass_Device_Class.POWER,
      unit_of_measurement: "W",
    }),
    new HttpSensor({
      sensor_parameter: SonnenbatterieParameter.POWER_CONSUMPTION,
    })
  );

  // STATE_OF_CHARGE
  announce_and_register_update(
    new MqttEntity({
      name: `${NAME_PREFIX} Ladezustand`,
      unique_id: `${UNIQUE_ID_PREFIX}state_of_charge`,
      entity_domain: Mqtt_Entity_Domain.SENSOR,
      device_class: Hass_Device_Class.BATTERY,
      unit_of_measurement: "%",
      charging_template: `{{ is_state("sensor.sonnenbatterie_betriebsart", "CHARGING")}}`,
    }),
    new HttpSensor({
      sensor_parameter: SonnenbatterieParameter.STATE_OF_CHARGE,
    })
  );

  // OPERATING_MODE
  const operating_mode_entity = new MqttEntity<string>({
    name: `${NAME_PREFIX} Betriebsart`,
    unique_id: `${UNIQUE_ID_PREFIX}operating_mode`,
    entity_domain: Mqtt_Entity_Domain.SENSOR,
  });
  operating_mode_entity.announce();

  const operating_mode_sensor = new HttpSensor<SonnenbatterieOperattingMode>({
    sensor_parameter: SonnenbatterieParameter.OPERATING_MODE,
  });
  operating_mode_entity.register_update(async () => {
    const val = await operating_mode_sensor.value();
    return SonnenbatterieOperattingMode[val];
  });

  // PHASE_L1_CONSUMPTION
  announce_and_register_update(
    new MqttEntity({
      name: `${NAME_PREFIX} Verbrauch Phase L1`,
      unique_id: `${UNIQUE_ID_PREFIX}phase_l1_consumption`,
      entity_domain: Mqtt_Entity_Domain.SENSOR,
      device_class: Hass_Device_Class.POWER,
      unit_of_measurement: "W",
    }),
    new HttpSensor({
      sensor_parameter: SonnenbatterieParameter.PHASE_L1_CONSUMPTION,
    })
  );

  // PHASE_L2_CONSUMPTION
  announce_and_register_update(
    new MqttEntity({
      name: `${NAME_PREFIX} Verbrauch Phase L2`,
      unique_id: `${UNIQUE_ID_PREFIX}phase_l2_consumption`,
      entity_domain: Mqtt_Entity_Domain.SENSOR,
      device_class: Hass_Device_Class.POWER,
      unit_of_measurement: "W",
    }),
    new HttpSensor({
      sensor_parameter: SonnenbatterieParameter.PHASE_L2_CONSUMPTION,
    })
  );

  // PHASE_L3_CONSUMPTION
  announce_and_register_update(
    new MqttEntity({
      name: `${NAME_PREFIX} Verbrauch Phase L3`,
      unique_id: `${UNIQUE_ID_PREFIX}phase_l3_consumption`,
      entity_domain: Mqtt_Entity_Domain.SENSOR,
      device_class: Hass_Device_Class.POWER,
      unit_of_measurement: "W",
    }),
    new HttpSensor({
      sensor_parameter: SonnenbatterieParameter.PHASE_L3_CONSUMPTION,
    })
  );

  // PHASE_L1_MAX_CONSUMPTION
  announce_and_register_update(
    new MqttEntity({
      name: `${NAME_PREFIX} Max Verbrauch Phase L1`,
      unique_id: `${UNIQUE_ID_PREFIX}phase_l1_max_consumption`,
      entity_domain: Mqtt_Entity_Domain.SENSOR,
      device_class: Hass_Device_Class.POWER,
      unit_of_measurement: "W",
    }),
    new HttpSensor({
      sensor_parameter: SonnenbatterieParameter.PHASE_L1_MAX_CONSUMPTION,
    })
  );

  // PHASE_L2_MAX_CONSUMPTION
  announce_and_register_update(
    new MqttEntity({
      name: `${NAME_PREFIX} Max Verbrauch Phase L2`,
      unique_id: `${UNIQUE_ID_PREFIX}phase_l2_max_consumption`,
      entity_domain: Mqtt_Entity_Domain.SENSOR,
      device_class: Hass_Device_Class.POWER,
      unit_of_measurement: "W",
    }),
    new HttpSensor({
      sensor_parameter: SonnenbatterieParameter.PHASE_L2_MAX_CONSUMPTION,
    })
  );

  // PHASE_L3_MAX_CONSUMPTION
  announce_and_register_update(
    new MqttEntity({
      name: `${NAME_PREFIX} Max Verbrauch Phase L3`,
      unique_id: `${UNIQUE_ID_PREFIX}phase_l3_max_consumption`,
      entity_domain: Mqtt_Entity_Domain.SENSOR,
      device_class: Hass_Device_Class.POWER,
      unit_of_measurement: "W",
    }),
    new HttpSensor({
      sensor_parameter: SonnenbatterieParameter.PHASE_L3_MAX_CONSUMPTION,
    })
  );

  // DISCHARGE_POWER
  announce_and_register_update(
    new MqttEntity({
      name: `${NAME_PREFIX} Entladeleistung`,
      unique_id: `${UNIQUE_ID_PREFIX}discharge_power`,
      entity_domain: Mqtt_Entity_Domain.SENSOR,
      device_class: Hass_Device_Class.POWER,
      unit_of_measurement: "W",
    }),
    new HttpSensor({
      sensor_parameter: SonnenbatterieParameter.DISCHARGE_POWER,
    })
  );

  // CHARGING_POWER
  announce_and_register_update(
    new MqttEntity({
      name: `${NAME_PREFIX} Ladeleistung`,
      unique_id: `${UNIQUE_ID_PREFIX}charging_power`,
      entity_domain: Mqtt_Entity_Domain.SENSOR,
      device_class: Hass_Device_Class.POWER,
      unit_of_measurement: "W",
    }),
    new HttpSensor({
      sensor_parameter: SonnenbatterieParameter.CHARGING_POWER,
    })
  );
};
