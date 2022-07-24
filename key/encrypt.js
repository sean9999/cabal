#!/usr/bin/env node

import { publicEncrypt } from 'crypto';
import { readFileSync } from 'fs';

const priv = readFileSync('./ed25519.priv.pem', 'utf8');
const pub = readFileSync('./ed25519.pub.pem', 'utf8');

const secretText = readFileSync('./secretfile.txt', 'utf8');

const cipherText = publicEncrypt(pub, new Buffer(secretText));

console.log({
	priv,
	pub,
	cipherText
});