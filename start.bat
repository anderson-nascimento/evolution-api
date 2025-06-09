@echo off
echo Criando rede Docker personalizada...
docker network create app-network

echo Subindo container PostgreSQL...
docker run -d ^
  --name postgres ^
  --network app-network ^
  -e POSTGRES_USER=user ^
  -e POSTGRES_PASSWORD=pass ^
  -e POSTGRES_DB=evolution ^
  -p 5432:5432 ^
  -v postgres-data:/var/lib/postgresql/data ^
  postgres:15

echo Build da imagem da evolution...
docker build -f DockerfileDev -t evolution .

echo Rodando container evolution...
docker run --rm ^
  --name evolution ^
  --network app-network ^
  -p 8080:8080 ^
  evolution

pause
