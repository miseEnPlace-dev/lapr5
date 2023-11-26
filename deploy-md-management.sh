#! /bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "LOG: Deploy web"
cd md-management

if [ -e .env ]; then
  echo "The .env file exists."
else
  echo "The .env file does not exist."
  touch .env
  cp .env.example .env
fi


echo "> Installing dependencies"
pnpm i --frozen-lockfile

echo "> Testing web"
pnpm test
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Tests passed"
else
  echo -e "${RED}Tests failed"
  exit 1
fi

echo -e "${NC}> Building web"
pnpm build
if [ $? -eq 0 ]; then
  echo -e "${GREEN}Build successful"
else
  echo -e "${RED}Build failed"
  exit 1
fi

export MONGODB_URI="mongodb+srv://user:NHdZ6bANdTkbzpYG@cluster0.nt1utn2.mongodb.net/?retryWrites=true&w=majority" JWT_SECRET="nf98hf98f3ohf3hf" PORT="2228" NODE_ENV="production"

echo -e "${NC}> Deploying web"
pnpm start &

if [ $? -eq 0 ]; then
  echo -e "${GREEN}Deploy successful"
  echo -e "${GREEN}Running in port 2228"
else
  echo -e "${RED}Failed to deploy"
  exit 1
fi

echo "Finished"
