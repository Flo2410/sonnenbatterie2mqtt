# Sonnenbatterie2mqtt

This is a service to push the stats of a sonnenBatterie to mqtt for use in Home assistant.

Refresh rate is 10 seconds.

# Important!

This service is using the old API of the sonnenBatterie. If you're looking for the new one, check out the [custom integration from weltmeyer](https://github.com/weltmeyer/ha_sonnenbatterie)

## Installation

This serice runs as a Docker container. You can either run it via the commandline or via docker compose

### CLI

```
docker run --rm \
    -e SONNENBATTERIE_IP=ip_of_the_battery \
    -e MQTT_BROKER_URL=mqtt_connection_string \
    --name sonnenbatterie2mqtt \
    ghcr.io/flo2410/sonnenbatterie2mqtt:latest
```

### Docker Compose

```yaml
version: "3"
services:
  sonnenbatterie2mqtt:
    image: ghcr.io/flo2410/sonnenbatterie2mqtt:latest
    restart: unless-stopped
    environment:
      - MQTT_BROKER_URL=mqtt_connection_string
      - SONNENBATTERIE_IP=ip_of_the_battery
```

## License

GNU General Public License v3.0 (see [LICENSE.md](LICENSE.md))
