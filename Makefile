build:
	docker-compose up -d --build

build-no-cache:
	docker-compose build --no-cache

up:
	docker-compose up -d

down:
	docker-compose down

logs:
	docker-compose logs

start:
	sudo service docker start

stop:
	sudo service docker stop

restart:
	sudo service docker restart

user:
	sudo chown -R $(shell whoami):$(shell whoami) .