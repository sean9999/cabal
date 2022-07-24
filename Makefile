SHELL=/bin/bash
BUILD_FOLDER=dist/build/linux

clean:
	rm -rf dist/*
	mkdir -p dist/staging ${BUILD_FOLDER}

build: clean
	./build.sh

install: build
	#	copy code
	source vars.sh && rsync --mkpath -a ${BUILD_FOLDER}/config/cabal/ $${CABAL_ROOT}/ 
	source vars.sh && cp -f ${BUILD_FOLDER}/local/bin/cabal $${CABAL_BIN_ROOT}/cabal

	#	set permissions
	source vars.sh \
	&& chmod +x $${CABAL_BIN_ROOT}/cabal $${CABAL_ROOT}/callers/bulletin \
	$${CABAL_ROOT}/callers/dump $${CABAL_ROOT}/callers/marco \
	$${CABAL_ROOT}/handlers/all $${CABAL_ROOT}/handlers/memberEvent.js 

	#	create and register systemd service
	cp -f ${BUILD_FOLDER}/config/systemd/user/* ~/.config/systemd/user/
	systemctl --user daemon-reload
	systemctl --user enable cabal.service
	