# Kubernetes-деплой Vishlist

Этот каталог переносит production-схему из `compose.yaml` в Kubernetes namespace `kls-2`:

```text
Интернет → Traefik Ingress (HTTPS) → /api/* → vishlist-api:8000 → mongodb:27017
                                  └→ /*     → vishlist-web:80
```

`mongodb`, `vishlist-api` и `vishlist-web` имеют тип `ClusterIP`. Это значит, что они
доступны только из сети Kubernetes. Единственная публичная точка — Traefik
Ingress. Такое разделение повторяет назначение `nginx-revers` в Compose и не
открывает порт MongoDB в интернет.

## Перед началом

1. Манифесты используют приватные образы Docker Hub `xant1ko/vishlist-api:v1` и
   `xant1ko/vishlist-web:v1`; перед деплоем соберите и загрузите их.
2. Создайте три DNS-записи `A` для `iwant.xant1ko.ru`: `185.174.166.70`,
   `78.24.181.191` и `80.93.187.150`. Это публичные IP Traefik нового кластера.
3. Скопируйте Secret-шаблон вне Git, замените `CHANGE_ME_*` и примените копию.
4. Получите сертификат Let's Encrypt отдельно и создайте TLS Secret `vishlist-tls`.
   В новом кластере cert-manager не установлен.

## Последовательность применения

```bash
# Войти в Docker Hub через access token и опубликовать приватные образы.
docker login -u xant1ko
make docker-push IMAGE_TAG=v1

# Создать Secret для скачивания приватных образов. Не сохраняйте token в Git.
kubectl -n kls-2 create secret docker-registry dockerhub-credentials \\
  --docker-server=https://index.docker.io/v1/ \\
  --docker-username=xant1ko \\
  --docker-password='DOCKER_HUB_ACCESS_TOKEN'

# Создать реальный Secret, подготовленный вне репозитория.
kubectl -n kls-2 apply -f /secure/path/vishlist-secrets.yaml

# Загрузить уже выданный сертификат и ключ в TLS Secret для Ingress.
kubectl -n kls-2 create secret tls vishlist-tls \\
  --cert=/secure/path/fullchain.pem \\
  --key=/secure/path/privkey.pem

# Применить все versioned манифесты; реальный Secret уже создан отдельной командой.
kubectl apply -k k8s
```

> Шаблон Secret намеренно не входит в `kustomization.yaml`, поэтому применить
> значения-заглушки обычной командой невозможно.

## Проверка

```bash
# Дождаться обновления всех workload'ов.
kubectl -n kls-2 rollout status statefulset/mongodb
kubectl -n kls-2 rollout status deployment/vishlist-api
kubectl -n kls-2 rollout status deployment/vishlist-web

# Проверить Pod'ы, Service, PVC и публичное правило.
kubectl -n kls-2 get pods,svc,pvc,ingress

# Проверить endpoint после того, как cert-manager выдаст сертификат.
curl --fail --silent --show-error https://iwant.xant1ko.ru/api/v1/health
```

## Доступ к MongoDB для обслуживания

MongoDB не публикуется публично. Для временного защищённого доступа с машины,
где есть kubeconfig, используйте:

```bash
kubectl -n kls-2 port-forward service/mongodb 27017:27017
```

После этого подключайтесь локально к `mongodb://127.0.0.1:27017`. PVC создаётся
StorageClass `local-path` по умолчанию. Этот класс хранит данные на локальном
диске ноды: он достаточен для минимального single-node развёртывания, но для
production с отказоустойчивостью потребуется replica set MongoDB и сетевое
хранилище с подходящей политикой резервного копирования.

## TLS без cert-manager

В этом кластере cert-manager отсутствует. После получения сертификата Let's
Encrypt создайте или обновите Secret `vishlist-tls` вручную. Сертификаты Let’s Encrypt
действуют 90 дней, поэтому продление и обновление Secret нужно организовать отдельно.
