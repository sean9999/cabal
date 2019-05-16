const notifier = require('node-notifier');

const fn = (msg) => {
	var message;
	switch (msg.event) {
		case 'member-join':
			message = `${msg.node.name} just joined`;
			break;
		case 'member-leave':
			message = `${msg.node.name} just left`;
			break;
		case 'member-update':
			message = `${msg.node.name} was updated`;
			break;
		default:
			message = `${msg.node.name} just did ${msg.event}`;
			break;
	}
	//	notify operator
	notifier.notify({
		title: msg.event,
		message
	});
};

module.exports = fn;