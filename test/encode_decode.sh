#!/bin/bash

payload="$(cat ./example.json.txt | ../lib/uglify_json | base64)"

serf query "cabal/msg" "$payload"
