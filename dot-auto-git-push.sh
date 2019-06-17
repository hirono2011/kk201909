#!/bin/bash

SYS_NAME=`uname -a|cut -d' ' -f2`
DATE=`date '+%Y-%m-%d_%H%M'`
COMMIT_MES="update ${DATE} ${SYS_NAME}"
git add -A && git commit -m "$COMMIT_MES"  && git push

echo "${COMMIT_MES} DONE"

