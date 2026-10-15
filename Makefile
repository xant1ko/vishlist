.DEFAULT_GOAL := help

DOCKER_NAMESPACE ?= xant1ko
IMAGE_TAG ?= v1
API_IMAGE := $(DOCKER_NAMESPACE)/vishlist-api:$(IMAGE_TAG)
WEB_IMAGE := $(DOCKER_NAMESPACE)/vishlist-web:$(IMAGE_TAG)

.PHONY: help install dev dev-api dev-web dev-db-up dev-db-down dev-db-logs dev-db-status build test docker-build docker-push

help: ## Показать доступные команды
	@awk 'BEGIN {FS = ":.*##"}; /^[a-zA-Z_-]+:.*##/ {printf "%-16s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Установить зависимости API и frontend
	npm --prefix api install
	npm --prefix web install

dev: dev-db-up ## Запустить MongoDB, API и frontend в watch-режиме
	@set -e; \
	npm --prefix api run start:dev & api_pid=$$!; \
	npm --prefix web run dev & web_pid=$$!; \
	trap 'kill $$api_pid $$web_pid 2>/dev/null || true' INT TERM EXIT; \
	wait $$api_pid $$web_pid

dev-api: ## Запустить только API в watch-режиме
	npm --prefix api run start:dev

dev-web: ## Запустить только frontend в watch-режиме
	npm --prefix web run dev

dev-db-up: ## Запустить локальную MongoDB
	./api/dev-tools/mongo.sh up

dev-db-down: ## Остановить локальную MongoDB
	./api/dev-tools/mongo.sh down

dev-db-logs: ## Показать логи MongoDB
	./api/dev-tools/mongo.sh logs

dev-db-status: ## Проверить состояние MongoDB
	./api/dev-tools/mongo.sh status

build: ## Собрать API и frontend
	npm --prefix api run build
	npm --prefix web run build

test: ## Запустить unit-тесты API
	npm --prefix api run test

docker-build: ## Собрать образы API и frontend для Docker Hub
	docker build --tag $(API_IMAGE) api
	docker build --tag $(WEB_IMAGE) web

docker-push: docker-build ## Собрать и отправить образы в Docker Hub
	docker push $(API_IMAGE)
	docker push $(WEB_IMAGE)
