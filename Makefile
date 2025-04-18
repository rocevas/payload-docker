up: ## Creates and starts the docker containers
	docker-compose up -d

down: ## Stops and removes the docker containers
	docker-compose down

destroy: ## Destroys the environment
	docker-compose down --rmi all --volumes --remove-orphans
	#rm -rf node_modules

ps: ## List docker containers
	docker-compose ps

logs: # Logs: make logs C=payload
	docker-compose logs -f $(C)

setup:
	cp .env.example .env
	$(MAKE) destroy up
	#npm install
	sleep 20 # Payload needs some time to build.
	docker ps
	@echo ""
	@echo "🔗 http://localhost:3000"
