const getSelf = require('./self');

const {
	exec
} = require('child_process');

const os = require('os');

const say = words => {
	let cmd = 'espeak polo';
	switch (os.platform()) {
		case 'darwin':
			cmd = 'say polo';
			break;
		case 'linux':
		default:
			cmd = 'espeak polo';
			break;
	}
	exec($cmd, (err, stdout, stderr) => {
		if (err) {
			console.error(err);
		} else {
			console.log('polo');
		}
	});
};

/*
	'aix'
	'darwin'
	'freebsd'
	'linux'
	'openbsd'
	'sunos'
	'win32'
*/

const fn = async (payload) => {
	const me = await getSelf();
	if (me.name !== payload.meta.from) {
		//polo(payload);
		say('polo');
		return 'polo';
	} else {
		say('marco is my boss');
	}
};

module.exports = fn;