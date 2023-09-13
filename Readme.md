# Ping Bot

Discord-Bot will notify subscribed user, who is not yet in a chat, when another user is joining a chat.

Commands:

- `/subscribe`: Subscribe to notifications
- `/unsubscribe`: Unsubscribe to notifications

## Environment variables

`TOKEN`: Secret token for Bot to connect to discord server
`CONFIG_PATH`: Path where config files are located

## Setup

Create secret

```yaml
kind: Secret
apiVersion: v1
metadata:
  name: ping-bot
  namespace: ping-bot
  labels:
    app.kubernetes.io/part-of: ping-bot
    app.kubernetes.io/name: ping-bot
type: Opaque
data:
  TOKEN: '<token-base-base64>'
```

## Scripts

### Docker

Build docker image

```bash
docker build -f docker/Dockerfile . --no-cache -t hasli01/ping-bot:<version>
```

Upload image to registry

```bash
docker push hasli01/ping-bot:<version>
```

### Helm

```bash
helm upgrade --install ping-bot ./helm
```
