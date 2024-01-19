start-dev:  start-db-containers seed-dev-data start-dev
clean-start-dev: reset-db-containers start-db-containers  seed-dev-data start-dev
clean-server-dev: reset-db-containers



seed-dev-data:
	yarn run seed

start-db-containers:
	npm run docker:env

start-dev:
	npm run start:dev

reset-db-containers:
	docker-compose --file docker/docker-compose.yaml down;
	docker volume rm docker_db_vol



