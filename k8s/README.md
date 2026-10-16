# Kubernetes-деплой Vishlist

Этот каталог развёртывает Vishlist в отдельный Kubernetes namespace `vishlist`:

```text
Интернет → Traefik Ingress (HTTPS) → /api/* → vishlist-api:8000 → mongodb:27017
                                  └→ /*     → vishlist-web:80
```

`mongodb`, `vishlist-api` и `vishlist-web` имеют тип `ClusterIP`. Это значит, что они
доступны только из сети Kubernetes. Единственная публичная точка — Traefik
Ingress. Такое разделение повторяет назначение `nginx-revers` в Compose и не
открывает порт MongoDB в интернет.



