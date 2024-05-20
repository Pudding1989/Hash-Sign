#!/usr/bin/env sh

# abort on errors
set -e

# check if dist directory exists and remove it
if [ -d "dist" ]; then
  rm -rf dist
fi

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'Deploy to Github'

# if you are deploying to https://<USERNAME>.github.io
# git push -f https://github.com/<USERNAME>/<USERNAME>.GitHub.io.git main

# if you are deploying to https://<USERNAME>.Github.io/<REPO>
# git push -f https://github.com/<USERNAME>/<REPO>.git main:gh-pages
git push -f git@github.com:Pudding1989/Hash-Sign.git master:gh-pages

cd -