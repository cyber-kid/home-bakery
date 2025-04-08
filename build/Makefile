# Makefile to automate the local build and deployment process

maven-build:
	@echo "Building Maven project (Backend)..."
	cd ../back-end && mvn package -DskipTests
	mkdir -p ../back-end/target/dependency
	cd ../back-end/target/dependency && jar -xf ../*.war
	@echo "Maven build complete."

docker-build-backend:
	@echo "Building Docker image for Backend..."
	cd ../back-end && GIT_COMMIT=$$(git rev-parse --short HEAD); \
	PROJECT_VERSION=$$(mvn help:evaluate -Dexpression=project.version -q -DforceStdout); \
	docker build -t amyrgorod/home-bakery-backend:$$PROJECT_VERSION-$$GIT_COMMIT -t amyrgorod/home-bakery-backend:staging ../back-end
	@echo "Backend Docker image created."

react-build:
	@echo "Building React project (Frontend)..."
	cd ../front-end && npm install && npm run build -- --mode staging
	@echo "React build complete."

docker-build-frontend:
	@echo "Building Docker image for Frontend..."
	cd ../front-end && GIT_COMMIT=$$(git rev-parse --short HEAD); \
	PROJECT_VERSION=$$(node -p "require('./package.json').version"); \
	docker build -t amyrgorod/home-bakery-frontend:$$PROJECT_VERSION-$$GIT_COMMIT -t amyrgorod/home-bakery-frontend:staging ../front-end
	@echo "Frontend Docker image created."

docker-up:
	@echo "Starting local environment using Docker Compose..."
	docker compose up -d
	@echo "Local environment started."

local-deploy: maven-build docker-build-backend react-build docker-build-frontend docker-up
	@echo "Deployment complete."

docker-down:
	@echo "Stopping local environment..."
	docker compose down
	@echo "Local environment stopped."

#docker-clean:
#	@echo "Cleaning up Docker images and volumes..."
#	docker system prune -f
#	@echo "Docker cleanup complete."
