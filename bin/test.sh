#!/bin/bash

# Setup nvm
if [ ! -f ~/.nvm/nvm.sh ]; then
  git clone https://github.com/creationix/nvm.git ~/.nvm
fi

source ~/.nvm/nvm.sh
nvm use

# Starting API server
cd ./test

NODE_ENV=test node --harmony index.js &

PID=$!



# Setup dredd
nvm install 0.10
nvm use 0.10

if hash dredd 2>/dev/null; then
  echo "Dredd already installed"
else
  npm -g install dredd &> /dev/null
fi

dredd --level verbose apiary.apib http://localhost:3777/
RESULT=$?
kill -9 $PID
exit $RESULT
