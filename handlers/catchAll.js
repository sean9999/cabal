const notifier = require('node-notifier');

const fn = (payload) => {
	notifier.notify({
		title: `Cabal :: ${payload.meta.action}`,
		message: `${payload.meta.from} says ${payload.body.msg}`
	});
};

module.exports = fn;
