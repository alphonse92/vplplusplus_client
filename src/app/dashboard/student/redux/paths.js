import { set } from 'lodash'

const PATHS = {
	'list.pagination.docs': [],
	'list.pagination.page': 1,
	'list.pagination.limit': 5,
	'list.pagination.total': 0,
	'list.pagination.sort': '',
	'list.pagination.direction': true,
}

const STUDENT = { root: 'students' }
const DEFAULTS = {}
for (let path in PATHS) {
	set(STUDENT, path, path)
	set(DEFAULTS, path, PATHS[path])
}

export {
	STUDENT,
	DEFAULTS
}