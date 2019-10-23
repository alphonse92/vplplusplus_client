import { set } from 'lodash'
import moment from 'moment'

const now = moment()
const currentYear = now.get('year')
const startOfFirstSemestre = moment(`${currentYear}-01-01`, 'YYYY-MM-DD')
const endOfFirstSemestre = moment(`${currentYear}-06-30`, 'YYYY-MM-DD')

const isFirstSemestre =
	now.isSameOrAfter(startOfFirstSemestre)
	&& now.isSameOrBefore(endOfFirstSemestre)

const firstSemestreRange = {
	from: `${currentYear}-01-01`,
	to: `${currentYear}-06-30`
}

const secondSemestreRAnge = {
	from: `${currentYear}-07-1`,
	to: `${currentYear}-12-31`
}

const range = isFirstSemestre ? firstSemestreRange : secondSemestreRAnge

const PATHS = {
	'project.filter': { ...range, topic: [] },
	'project.report': [],
	'project.stadistics': {},
	'project.stadistics.timeline.datasets': [],
	'project.stadistics.timeline.labels': [],
	'project.stadistics.timeline.options': {
		type: 'months'
		, each: 6
		, steps: 4
		, topic: []
		, projects: []
		, id: undefined
		, showProjectFilter: false
		, showStudentFilter: false
		, type: undefined
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