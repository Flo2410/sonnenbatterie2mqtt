#!/bin/bash
#docker buildx create --name multiarch
#docker buildx use multiarch && docker buildx inspect --bootstrap
docker buildx build --push --platform linux/arm/v7,linux/arm64/v8,linux/amd64 --tag ghcr.io/flo2410/sonnenbatterie2mqtt:latest .