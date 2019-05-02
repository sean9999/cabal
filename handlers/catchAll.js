const notifier = require('node-notifier');

const fn = async (payload) => {
	notifier.notify({
		"title": `Cabal :: ${payload.meta.action}`,
		"message": `${payload.meta.sender} says ${payload.body.msg}`
	});
	return `msg: ${payload.body.msg}`;
};

module.exports = fn;
