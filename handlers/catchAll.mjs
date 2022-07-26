import pkg from 'node-notifier';
const { notify } = pkg;

const fn = async (payload) => {
	notify({
		"title": `Cabal :: ${payload.meta.action}`,
		"message": `${payload.meta.sender} says ${payload.body.msg}`
	});
	return `msg: ${payload.body.msg}`;
};

export default fn;
