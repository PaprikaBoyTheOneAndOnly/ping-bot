# Ping Bot

## Scripts

### Docker

Build docker image

```bash
docker build -f docker/Dockerfile . --no-cache -t ping-bot:v1.0.0
```

Tag image

```bash
docker tag ping-bot:v1.0.0 hasli01/ping-bot:v1.0.0
```

Upload image to registry

```bash
docker push hasli01/ping-bot:v1.0.0
```

### Helm

```bash
helm install ping-bot ./helm
```

```bash
helm upgrade ping-bot ./helm
```