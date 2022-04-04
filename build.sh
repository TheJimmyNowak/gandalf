#!/bin/bash
# Check whether there are changes on git
UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

# Exit if no changes on REMOTE
 if [ $LOCAL = $REMOTE ]; then
    echo "App is up to date"
    exit 0 
fi

git pull origin master

# Build frontend
(cd gandalf-frontend/; npm i)
(cd gandalf-frontend; npm run build)
rm -r /var/www/gandalf-frontend/
mv gandalf-frontend/build/ /var/www/gandalf-frontend


# Build Backend
# Create venv if not exists
if [ ! -d "/gandalf-backend/venv"]; then
  (cd gandalf-backend/; /usr/bin/python3 -m venv venv)
fi

gandalf-backend/venv/bin/pip install -r gandalf-backend/requirements.txt

exit 0 
