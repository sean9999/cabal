import getSelf from './self';

import { exec } from 'child_process';

import { platform } from 'os';

const say = words => {
	return new Promise((resolve, reject) => {
		var cmd;
		switch (platform()) {
			case 'darwin':
				cmd = 'say two polo';
				break;
			case 'linux':
			default:
				cmd = 'espeak two polo';
				break;
		}
		exec(cmd, (err, stdout, stderr) => {
			if (err) {
				console.error(stderr);
				reject(err);
			} else {
				console.log('polo2');
				resolve('polo2');
			}
		});
	});
};

const fn = async (payload) => {
	var r;
	try {
		const me = await getSelf();
		if (me.name !== payload.meta.sender) {
			await say('two polo');
			r = true;
		} else {
			r = false;
		}
	} catch (e) {
		console.error(e);
		await say('oh no!');
		throw Error('Could not complete operation in polo2');
	}
	return r;
};

export default fn;
