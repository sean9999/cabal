#!/bin/bash

NAMESPACE="ca.fukt.cabal"
ACTION="$1"
NONCE="$(uuidgen)"
SIG="$(openssl rand -base64 16 | tr -d '+\n=')"
SELF="$(serf info -format json | jq -r '.agent.name')"

PAYLOAD=$(cat <<HEREDOC
{
	"meta": {
		"none": "${NONCE}",
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
BAYLOAD=$(echo "$PAYLOAD" | base64)

serf query "${NAMESPACE}/${ACTION}" "$BAYLOAD"

