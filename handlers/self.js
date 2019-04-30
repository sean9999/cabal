#!/usr/bin/env node

var SerfRPC = require("serf-rpc");
var serf = new SerfRPC();

const p = () => {
	return new Promise((resolve, reject) => {
		serf.connect(function (err) {
			if (err) {
				reject(err);
			}
			serf.stats((err, me) => {
				if (err) {
					reject(err);
				} else {
					const r = {
						"name": me.agent.name
					};
					for (let k in me.tags) {
						if (/cabal/.test(k)) {
							let shortKey = k.replace('ca.fukt.cabal/', '');
							let v = me.tags[k];
							r[shortKey] = v;
						}
					}
					resolve(r);
				}
			});
			serf.stop();
		});
	});
};

module.exports = p;