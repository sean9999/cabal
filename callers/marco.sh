#!/bin/bash


##	sig should contain base64-encoded timestamp plus a signature to prove ID
sig="$(openssl rand -base64 ${1:-16} | tr -d '+\n=')"

serf query "marco" "$sig"
