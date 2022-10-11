import { anounce_all_entities } from "./mqtt/discovery";
import { setup_mqtt } from "./mqtt/setup";

console.log("Hello World");

setup_mqtt();

anounce_all_entities();

console.log("bottom");
