#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');

const KEYTYPE = 'ed25519';
const FILEFORMAT = 'pem';

var keys = crypto.generateKeyPairSync(KEYTYPE, {});

var priv = keys.privateKey.export({
	type: "pkcs8",
	format: FILEFORMAT
});
var pub = keys.publicKey.export({
	type: "spki",
	format: FILEFORMAT
});

fs.writeFileSync(`./${KEYTYPE}.pub.${FILEFORMAT}`, pub, {
	encoding: "utf8"
});
fs.writeFileSync(`./${KEYTYPE}.priv.${FILEFORMAT}`, priv, {
	encoding: "utf8"
});

console.log({
	priv,
	pub
});