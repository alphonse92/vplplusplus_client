import { set } from 'lodash'

const PATHS = {
	'lang': 'ES',
}

const LANG = { root: 'lang' }
const DEFAULTS = {}
for (let path in PATHS) {
	set(LANG, path, path)
	set(DEFAULTS, path, PATHS[path])
}

export {
	LANG ,
	DEFAULTS
}