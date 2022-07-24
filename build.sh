#!/bin/bash

##	this is too complex to be placed directly in a Makefile.

source vars.sh

##	stage
rsync --mkpath -a callers   ./dist/staging/config/cabal
rsync --mkpath -a handlers  ./dist/staging/config/cabal
rsync --mkpath -a config.d  ./dist/staging/config/cabal
rsync --mkpath -a key       ./dist/staging/config/cabal
rsync --mkpath -a systemd/  ./dist/staging/config/systemd/user/
rsync --mkpath -a bin/cabal ./dist/staging/local/bin/cabal

TRANSFORM_THESE='${CABAL_NAMESPACE} ${CABAL_ROOT} ${CABAL_BIN_ROOT} ${CABAL_VERSION} ${CABAL_PORT} ${CABAL_CLUSTER} ${CABAL_LOG_LEVEL}'

##	build
cd ./dist/staging
DEST=../build/linux
find . -type f | while read fylename; 
do 
	## inject vars and copy to new folder
	mkdir -p $(dirname $DEST/$fylename)
	cat $fylename | envsubst "$TRANSFORM_THESE" > $DEST/$fylename
done
