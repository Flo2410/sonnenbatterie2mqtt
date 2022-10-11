import * as dotenv from "dotenv";
dotenv.config();

import { setup } from "./setup";
import { setup_mqtt } from "./mqtt/setup";

console.log(process.env.SONNENBATTERIE_IP);

setup_mqtt();
setup();
