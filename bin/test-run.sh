#!/bin/bash

source ~/.nvm/nvm.sh
nvm use

# Move to test directory
cd ./test

# Starting API server
NODE_ENV=test node --harmony index.js &

PID=$!

nvm use 0.10

# Start dredd
dredd --level verbose ../apiary.apib http://localhost:3777/
RESULT=$?
kill -9 $PID
exit $RESULT
