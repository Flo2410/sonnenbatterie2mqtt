import { discover_ip_setting, discover_test_sensor } from "./mqtt/discovery";
import { setup_mqtt } from "./mqtt/setup";

console.log("Hello World");

setup_mqtt();

discover_ip_setting();
discover_test_sensor();

console.log("bottom");
