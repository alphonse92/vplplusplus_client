import { set } from 'lodash'

const PATHS = {
	'create.show': false,
	'list.pagination.docs': [],
	'list.pagination.page': 1,
	'list.pagination.limit': 25,
	'list.pagination.total': 0,
	'list.pagination.sort': '',
}

const PROJECT = { root: 'projects' }
const DEFAULTS = {}
for (let path in PATHS) {
	set(PROJECT, path, path)
	set(DEFAULTS, path, PATHS[path])
}

export {
	PROJECT,
	DEFAULTS
}