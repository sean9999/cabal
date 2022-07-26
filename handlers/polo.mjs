import selfModule from './self.mjs';
const { getSelf } = selfModule;

import { exec } from 'child_process';

import { platform } from 'os';

const say = words => {
	return new Promise((resolve, reject) => {
		var cmd = 'espeak polo';
		switch (platform()) {
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
				console.error(stderr);
				reject(err);
			} else {
				console.log('polo');
				resolve('polo');
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
		await say('oh no!');
		throw Error('Could not complete operation in polo');
	}
	return r;
};

export default fn;
