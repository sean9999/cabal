const getSelf = require('./self');

const {
	exec
} = require('child_process');


const say = words => {
	exec('espeak polo', (err, stdout, stderr) => {
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
		return 'marco';
	}
};

module.exports = fn;
