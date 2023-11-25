#! /bin/bash

GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo "LOG: Deploy web"
cd web
echo "> Installing dependencies"
pnpm i

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


echo -e "${NC}> Deploying web"
pnpm preview

if [ $? -eq 0 ]; then
  echo -e "${GREEN}Deploy successful"
  echo -e "${GREEN}Running in localhost:4173/"
else
  echo -e "${RED}Failed to deploy"
  exit 1
fi

echo "Finished"
