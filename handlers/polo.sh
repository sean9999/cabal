#!/bin/bash

while read line; do
	notify-send $SERF_QUERY_NAME "$line"
	speak-ng -v en-029 polo
done
