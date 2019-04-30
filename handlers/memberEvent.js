const notifier = require('node-notifier');

const fn = (msg) => {
	notifier.notify({
		title: msg.event,
		message: `${msg.node.name} just did a ${msg.event}`
	});
};

module.exports = fn;
