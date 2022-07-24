#!/usr/bin/env node

import { generateKeyPairSync } from 'crypto';
import { writeFileSync } from 'fs';

const KEYTYPE = 'ed25519';
const FILEFORMAT = 'pem';

var keys = generateKeyPairSync(KEYTYPE, {});

var priv = keys.privateKey.export({
	type: "pkcs8",
	format: FILEFORMAT
});
var pub = keys.publicKey.export({
	type: "spki",
	format: FILEFORMAT
});

writeFileSync(`./${KEYTYPE}.pub.${FILEFORMAT}`, pub, {
	encoding: "utf8"
});
writeFileSync(`./${KEYTYPE}.priv.${FILEFORMAT}`, priv, {
	encoding: "utf8"
});

console.log({
	priv,
	pub
});