import { set } from 'lodash'

const PATHS = {
	'create.show': false,
	'create.project': {},
	'create.tests': [],
	'get.project': false,
	'course.activities': [],
	'topics.list.pagination.docs': [],
	'topics.list.pagination.page': 1,
	'topics.list.pagination.limit': 25,
	'topics.list.pagination.total': 0,
	'topics.list.pagination.sort': '',
	'list.pagination.docs': [],
	'list.pagination.page': 1,
	'list.pagination.limit': 5,
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