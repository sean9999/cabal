#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

##	globals
SELF="$(serf info -format json | jq -r '.agent.name')"

function envelope() {
	##	message uniqueness and integrity
	export ACTION="$1"
	shift
	export MSG="$@"
	export NONCE="$(uuidgen)"
	export SIG="$(openssl rand -base64 16 | tr -d '+\n=')"
	export CABAL_NAMESPACE CABAL_VERSION SELF
	##	the message
	PAYLOAD="$(cat $CABAL_ROOT/callers/envelope.template)"
	##	compress json, and base64 encode it
	BAYLOAD="$(echo $PAYLOAD | envsubst | jq --slurp -Mac '.[0]' | base64 --wrap=0)"
	echo "$BAYLOAD"
}

function cabal_query() {
	BAYLOAD="$(envelope $1 $2)"
	serf query --no-ack -timeout="1s" \
		-tag "ca.fukt.cabal/cluster=${CABAL_CLUSTER}" \
		"${CABAL_NAMESPACE}/${1}" "${BAYLOAD}"
}

function cabal_event() {
	BAYLOAD="$(envelope $1 $2)"
	serf event -coalesce=false \
		"${CABAL_NAMESPACE}/${1}" "${BAYLOAD}"
}
