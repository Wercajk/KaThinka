#!/bin/bash

# Setup nvm
if [ ! -f ~/.nvm/nvm.sh ]; then
  git clone https://github.com/creationix/nvm.git ~/.nvm
fi

source ~/.nvm/nvm.sh
nvm use


# Setup dredd unde 0.10, because
# protagonist is not running under 0.11!
nvm install 0.10
nvm use 0.10

if hash dredd 2>/dev/null; then
  echo "Dredd already installed"
else
  npm -g install dredd &> /dev/null
fi
