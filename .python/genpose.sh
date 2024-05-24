#!/bin/bash

COMBINED_ENV_FILE=$(mktemp)
cat ./apps/ms-bridge/env/.env ./apps/backend/env/.env >"$COMBINED_ENV_FILE"

if [[ "$1" == "--up" ]]; then
    npx dotenv -e "$COMBINED_ENV_FILE" -- python3 .python/genpose.py ./docker-compose.yml --template-dir .python/templates
    docker compose up
else
    npx dotenv -e "$COMBINED_ENV_FILE" -- python3 .python/genpose.py ./docker-compose.yml --template-dir .python/templates "$@"
fi

rm "$COMBINED_ENV_FILE"
