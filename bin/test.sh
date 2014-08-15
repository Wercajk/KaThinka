#!/bin/bash

echo "Test:Prepare:Start"
bin/test-prepare.sh &> /dev/null
echo "Test:Prepare:End"

echo "Test:Run:Start"
bin/test-run.sh
echo "Test:Run:End"
