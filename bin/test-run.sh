#!/bin/bash

source ~/.nvm/nvm.sh
nvm use

# Move to test directory
cd ./example-app

# Starting API server
NODE_ENV=test  node --harmony index.js --server:port 3777 &

PID=$!

sleep 1

nvm use 0.10

# Start dredd
dredd --level verbose ../apiary.apib http://localhost:3777/
RESULT=$?
kill -9 $PID
exit $RESULT
