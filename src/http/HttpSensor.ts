import axios from "axios";
import { SonnenbatterieParameter } from "types/sonnenbatterie.type";

export interface IHttpSensor<T> {
  sensor_parameter: SonnenbatterieParameter;
  url: string;

  value: () => Promise<T>;
}

export type IHttpSensorParams<T> = Omit<IHttpSensor<T>, "url" | "value">;

export class HttpSensor<T = number> implements IHttpSensor<T> {
  private static readonly BASE_URL = `http://${process.env.SONNENBATTERIE_IP}:7979/rest/devices/battery/`;

  sensor_parameter: SonnenbatterieParameter;
  url: string;

  constructor({ sensor_parameter }: IHttpSensorParams<T>) {
    this.sensor_parameter = sensor_parameter;
    this.url = HttpSensor.BASE_URL + this.sensor_parameter;
  }

  public async value(): Promise<T> {
    return await (
      await axios.get(this.url)
    ).data;
  }
}
