@echo off
setlocal ENABLEEXTENSIONS

:: Cores (simples no CMD)
set INFO=[INFO]
set ERROR=[ERROR]
set WARNING=[WARNING]

:: Mostrar versões
echo %INFO% Node.js:
call node -v

echo %INFO% npm:
call npm -v

:: Instalar dependências
if not exist node_modules (
  echo %INFO% Instalando dependencias do projeto...
  call npm install
)

:: Deploy do banco de dados
echo %INFO% Executando deploy do banco de dados...
call npm run db:generate
call npm run db:deploy

:: Iniciar projeto
echo %INFO% Iniciando o projeto...
if "%1"=="-dev" (
    call npm run dev:server
) else (
    call npm run build
    call npm run start:prod
)

echo %INFO% Instalacao concluida com sucesso!

pause
