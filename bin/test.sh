#!/bin/bash

echo "Test:Prepare:Start"
bin/test-prepare.sh &> /dev/null
echo "Test:Prepare:End"

echo "Test:Run:Start"
bin/test-run.sh
result=$?
echo "Test:Run:End"
exit $result
