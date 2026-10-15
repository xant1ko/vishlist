# Dev tools

Локальная MongoDB для разработки API.

```sh
cp dev-tools/.env.example dev-tools/.env
./dev-tools/mongo.sh up
```

Доступные команды:

```sh
./dev-tools/mongo.sh up
./dev-tools/mongo.sh down
./dev-tools/mongo.sh logs
./dev-tools/mongo.sh status
```

Значения из `dev-tools/.env` должны совпадать с `MONGO_USERNAME`, `MONGO_PASSWORD` и `MONGO_PORT` в `api/.env`.
