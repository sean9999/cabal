const notifier = require('node-notifier');

const getSelf = require('./self');

const fn = async (payload) => {
	const me = await getSelf();
	if (me.name !== payload.meta.from) {

		notifier.notify({
		"title": `Cabal :: ${payload.meta.action}`,
		"message": `message was from ${payload.meta.from} and I am ${me.name}`
		});

		console.log('hiya from' + me.name);

	}
};

module.exports = fn;
