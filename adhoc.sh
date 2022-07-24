#!/bin/bash

set -euo pipefail
IFS=$'\n\t'

NAMESPACE="${CABAL_NAMESPACE}"
ACTION="$1"
NONCE="$(uuidgen)"
SIG="$(openssl rand -base64 16 | tr -d '+\n=')"
SELF="$(serf info -format json | jq -r '.agent.name')"
MSG="$2"

PAYLOAD=$(cat <<HEREDOC
{"meta": {"action": "${ACTION}","sender": "$SELF"},"body": {"msg": "$MSG"}}
HEREDOC
)
BAYLOAD=$(echo "$PAYLOAD" | base64)

#exec ~/.config/serf/callers/marco

serf query "${NAMESPACE}/${ACTION}" "$BAYLOAD"
