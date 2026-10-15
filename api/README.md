# Vishlist API

Бэкенд для Vishlist, написанный на NestJS и TypeScript. API доступен с префиксом `/api/v1`; документация Swagger — по адресу `/api/v1/docs`.

## Стек

- NestJS 11
- MongoDB
- JWT и Passport для аутентификации
- Swagger для документации API
- class-validator для валидации входящих данных

## Требования

- Node.js 20 или новее
- npm

## Запуск

Из корня репозитория весь development-стек можно запустить одной командой:

```bash
make dev
```

Она запускает MongoDB, API и frontend. Список дополнительных команд доступен через `make help`.

Перейдите в директорию API и установите зависимости:

```bash
cd api
npm install
```

Создайте локальный файл окружения на основе примера:

```bash
cp .env.example .env
cp dev-tools/.env.example dev-tools/.env
```

Запустите локальную MongoDB:

```bash
./dev-tools/mongo.sh up
```

Учётные данные `MONGO_USERNAME` и `MONGO_PASSWORD` в `.env` должны совпадать с `MONGO_INITDB_ROOT_USERNAME` и `MONGO_INITDB_ROOT_PASSWORD` в `dev-tools/.env`.

Запустите сервер в режиме разработки:

```bash
npm run start:dev
```

По умолчанию сервер будет доступен по адресу <http://localhost:8000/api/v1>, Swagger — на <http://localhost:8000/api/v1/docs>, а healthcheck — на <http://localhost:8000/api/v1/health>. Healthcheck проверяет доступность MongoDB.

## Аутентификация

Перед запуском укажите в `.env` секрет `JWT_SECRET`. При регистрации и входе сервер устанавливает HTTP-only cookie `vishlist_access_token`.

| Метод | Адрес | Описание |
| --- | --- | --- |
| `POST` | `/api/v1/auth/register` | Регистрация пользователя |
| `POST` | `/api/v1/auth/login` | Вход |
| `POST` | `/api/v1/auth/logout` | Выход и удаление cookie |
| `GET` | `/api/v1/auth/me` | Текущий пользователь |

Все endpoints также доступны в Swagger. Для локальной разработки оставьте `JWT_COOKIE_SECURE=false`; в production установите `true`.

## Подарки

Все операции с подарками требуют авторизации. Пользователь видит и изменяет только свои записи.

| Метод | Адрес | Описание |
| --- | --- | --- |
| `POST` | `/api/v1/gifts` | Создать подарок |
| `GET` | `/api/v1/gifts` | Получить свой список подарков |
| `GET` | `/api/v1/gifts/:id` | Получить свой подарок |
| `PATCH` | `/api/v1/gifts/:id` | Обновить свой подарок |
| `DELETE` | `/api/v1/gifts/:id` | Удалить свой подарок |

Поля подарка: `name` (строка), `description` (строка), `links` (массив URL-строк).

## Полезные команды

```bash
npm run build  # собрать проект
npm run start  # запустить без watch-режима
npm run test   # запустить unit-тесты
```

Подробности управления локальной базой — в [dev-tools/README.md](dev-tools/README.md).
