import { set } from 'lodash'

const PATHS = {
	'project.filter': {},
	'project.report': [],
	'project.stadistics': {},
	'project.statadistics.timeline.datasets': [],
	'project.statadistics.timeline.options': {
		type: 'months'
		, each: 6
		, steps: 4
		, topic: []
	},
	'student.filter': [],
	'student.report': [],
	'student.stadistics': {},

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