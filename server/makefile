start-server-dev:  start-db-containers  start-dev seed-dev-data
clean-start-server-dev: reset-db-containers start-db-containers   start-dev
clean-server-dev: reset-db-containers



seed-dev-data:
	yarn run seed

start-db-containers:
	npm run docker:env

start-dev:
	yarn run start:dev

reset-db-containers:
	docker-compose --file docker/docker-compose.yaml down;
	docker volume rm docker_db_vol



