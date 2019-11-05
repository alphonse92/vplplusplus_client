import { set } from 'lodash'

const PATHS = {
	'list.pagination.docs': [],
	'list.pagination.page': 1,
	'list.pagination.limit': 5,
	'list.pagination.total': 0,
	'list.pagination.sort': '',
	'list.pagination.direction': true,
}

const TOPIC = { root: 'topic' }
const DEFAULTS = {}
for (let path in PATHS) {
	set(TOPIC, path, path)
	set(DEFAULTS, path, PATHS[path])
}

export {
	TOPIC,
	DEFAULTS
}