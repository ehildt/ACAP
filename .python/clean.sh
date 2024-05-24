#!/bin/bash

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <directory> <arguments...>"
    exit 1
fi

python3 .python/clean.py ../ "$@"
