#!/bin/bash
rm -rf doc || exit 0;
npm run doc
( cd doc
 git init
 git config user.name "Travis-CI"
 git config user.email "travis@nodemeatspace.com"
 git add .
 git commit -m "Deploy doc to Github Pages"
 git push --force --quiet "https://github.com/Wercajk/KaThinka.git" master:gh-pages
)
