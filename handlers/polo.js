const getSelf = require('./self');

const { exec } = require('child_process');

const os = require('os');

const say = words => {
	return Promise((resolve,reject) => {
		var cmd = 'espeak polo';
		switch (os.platform()) {
		case 'darwin':
			cmd = '/usr/bin/say polo';
			break;
		case 'linux':
		default:
			cmd = 'espeak polo';
			break;
		}
		exec(cmd, (err, stdout, stderr) => {
			if (err) {
				console.error(stderr);
				reject(err);
			} else {
				resolve('polo');
				console.log('polo');
			}
		});
	});
};

const fn = async (payload) => {
	var r;
	try {
		const me = await getSelf();
		if (me.name !== payload.meta.sender) {
			await say('polo');
			r = true;
		} else {
			r = false;
		}
	} catch (e) {
		console.error(e);
		await say('oh no');
		throw Error('Could not complete operation in polo');
	}
	return r;
};

module.exports = fn;
