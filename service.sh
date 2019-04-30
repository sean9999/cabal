#!/bin/bash

serf agent -config-file=$HOME/.config/serf/config.json \
	-keyring-file=$HOME/.config/serf/key/ring.json \
	-tags-file=$HOME/.config/serf/tags.json &