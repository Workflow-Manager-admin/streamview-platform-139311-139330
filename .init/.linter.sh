#!/bin/bash
cd /home/kavia/workspace/code-generation/streamview-platform-139311-139330/netflix_clone_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

