#!/usr/bin/env node

const crypto = require('crypto');
const fs = require('fs');

const priv = fs.readFileSync('./ed25519.priv.pem', 'utf8');
const pub = fs.readFileSync('./ed25519.pub.pem', 'utf8');

const secretText = fs.readFileSync('./secretfile.txt', 'utf8');

const cipherText = crypto.publicEncrypt(pub, new Buffer(secretText));

console.log({
	priv,
	pub,
	cipherText
});