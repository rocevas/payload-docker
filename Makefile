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

setup: destroy
	#npm install
	$(MAKE) up
	sleep 20 # need some time for payload to build up
	docker ps
	@echo ""
	@echo "🔗 http://localhost:3000"
