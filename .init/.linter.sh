#!/bin/bash
cd /home/kavia/workspace/code-generation/volunteer-connect-platform-4452/volunteering_system_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

