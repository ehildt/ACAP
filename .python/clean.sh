#!/bin/bash

if [ "$#" -lt 1 ]; then
    echo "Usage: $0 <directory> <arguments...>"
    exit 1
fi

if ! [ -x "$(command -v sudo)" ]; then
    echo 'Error: sudo is not installed. Please install sudo or run the script as a superuser.' >&2
    exit 1
fi

sudo python3 .python/clean.py ../ "$@"
