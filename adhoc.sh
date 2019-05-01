#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

NAMESPACE="ca.fukt.cabal"
ACTION="$1"
NONCE="$(uuidgen)"
SIG="$(openssl rand -base64 16 | tr -d '+\n=')"
SELF="$(serf info -format json | jq -r '.agent.name')"
MSG="$2"

PAYLOAD=$(cat <<HEREDOC
{"meta": {"action":"${ACTION}","from":"$SELF"},"body":{"msg":"$MSG"}}
HEREDOC
)
BAYLOAD="$(echo $PAYLOAD | base64)"

echo size is $(echo $BAYLOAD | wc -c)


#exec ~/.config/serf/callers/marco

#serf query "${NAMESPACE}/${ACTION}" "$BAYLOAD"
