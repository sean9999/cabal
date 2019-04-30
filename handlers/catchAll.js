const notifier = require('node-notifier');

const fn = (payload) => {
	notifier.notify({
		title: `Cabal :: ${payload.meta.from}`,
		message: `${payload.body.msg}`
	});
};

module.exports = fn;
