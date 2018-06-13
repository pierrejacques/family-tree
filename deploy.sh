#~/bin/bash

echo "deploying familytree"

source ../config.sh

DEST="~/familytree"


rm dist/static/css/**.map
rm dist/static/js/**.map
rsync -r dist/* $USER@$URL:$DEST
