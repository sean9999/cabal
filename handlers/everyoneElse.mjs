import pkg from 'node-notifier';
const { notify } = pkg;

import getSelf from './self.mjs';

const fn = async (payload) => {
	const me = await getSelf();
	if (me.name !== payload.meta.sender) {
		notify({
			"title": `Cabal :: ${payload.meta.sender}`,
			"message": `${payload.body.msg}`
		});
		return `${me.name} got the message`;
	} else {
		return `${me.name} sent the message`;
	}
};

export default fn;
