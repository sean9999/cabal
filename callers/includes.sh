#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

CABAL_ROOT="$(git root)"

##	globals
NAMESPACE="ca.fukt.cabal"
VERSION="v0.0.1"
SELF="$(serf info -format json | jq -r '.agent.name')"

function envelope() {
	##	message uniqueness and integrity
	export ACTION="$1"
	shift
	export MSG="$@"
	export NONCE="$(uuidgen)"
	export SIG="$(openssl rand -base64 16 | tr -d '+\n=')"
	export NAMESPACE VERSION SELF
	##	the message
	PAYLOAD="$(cat $CABAL_ROOT/callers/envelope.template)"
	##	compress json, and base64 encode it
	BAYLOAD="$(echo $PAYLOAD | envsubst | jq --slurp -Mc '.[0]' | base64)"
	echo "$BAYLOAD"
}

function cabal_query() {
	BAYLOAD="$(envelope $1 $2)"
	serf query \
		--no-ack \
		-timeout="5s" \
		-tag "ca.fukt.cabal/cluster=zoo" \
		"${NAMESPACE}/${1}" "${BAYLOAD}"
}
