import { set } from 'lodash'
import { STATE_DEFAULT } from "./reducer";

const PATHS = [
	'dialogs.create.show',
	'dialogs.create.data',
]
const PROJECT = { root: 'projects' }

for (let idx in PATHS) {
	let path = PATHS[idx]
	set(PROJECT, path, path)
}


export {
	PROJECT
}