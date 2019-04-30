const getSelf = require('./self');

const {
	exec
} = require('child_process');

const os = require('os');

const say = words => {
	return Promise((resolve,reject) => {
	var cmd = 'espeak polo';
	switch (os.platform()) {
		case 'darwin':
			cmd = 'say polo';
			break;
		case 'linux':
		default:
			cmd = 'espeak polo';
			break;
	}
	exec(cmd, (err, stdout, stderr) => {
		if (err) {
			console.error(err);
			reject(err);
		} else {
			resolve(stdout);
			console.log('polo');
		}
	});
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
	try {
		const me = await getSelf();
		if (me.name !== payload.meta.from) {
			//polo(payload);
			return await say('polo');
		}
	} catch (e) {
		console.error(e);
		return await say('oh no!');
	}
};

module.exports = fn;
