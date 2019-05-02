const notifier = require('node-notifier');

const getSelf = require('./self');

const fn = async (payload) => {
	const me = await getSelf();
	if (me.name !== payload.meta.sender) {
		notifier.notify({
			"title": `Cabal :: ${payload.meta.sender}`,
			"message": `${payload.body.msg}`
		});
		return `${me.name} got the message`;
	} else {
		return false;
	}
};

module.exports = fn;
