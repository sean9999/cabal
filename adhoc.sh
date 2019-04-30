#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

NAMESPACE="ca.fukt.cabal"
ACTION="$1"
NONCE="$(uuidgen)"
SIG="$(openssl rand -base64 16 | tr -d '+\n=')"
SELF="$(serf info -format json | jq -r '.agent.name')"

PAYLOAD=$(cat <<HEREDOC
{
	"meta": {
		"nonce": "${NONCE}",
		"sig": "${SIG}",
		"action": "${ACTION}",
		"from": "$SELF"
	},
	"body": {
		"msg": "$2"
	}
}
HEREDOC
)
BAYLOAD="$(echo $PAYLOAD | base64)"

#echo "$BAYLOAD" | base64 -d

serf query "${NAMESPACE}/${ACTION}" "$BAYLOAD"
