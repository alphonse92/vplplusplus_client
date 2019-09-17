import { set } from 'lodash'

const PATHS = {
	'project': [],
	'student': [],
}

const REPORT = { root: 'report' }
const DEFAULTS = {}
for (let path in PATHS) {
	set(REPORT, path, path)
	set(DEFAULTS, path, PATHS[path])
}

export {
	REPORT,
	DEFAULTS
}