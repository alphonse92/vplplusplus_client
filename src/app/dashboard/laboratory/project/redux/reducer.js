
import { Actions } from './actions'
import { getReducerMap, createReducer } from '../../../../../lib/redux'

export const reducerMap = getReducerMap(Actions)
export const REDUCER = createReducer(reducerMap)(
  {
    create: {
      show: false,
      project: {},
      tests: []
    },
    get: {
      project: false
    },
    course: {
      activities: []
    },
    topics: {
      list: {
        pagination: {
          docs: [],
          page: 1,
          limit: 25,
          total: 0,
          sort: ''
        }
      }
    },
    list: {
      pagination: {
        docs: [],
        page: 1,
        limit: 25,
        total: 0,
        sort: ''
      }
    }

  }
  // 'create.show': false,
  // 'create.project': {},
  // 'create.tests': [],
  // 'get.project': false,
  // 'course.activities': [],
  // 'topics.list.pagination.docs': [],
  // 'topics.list.pagination.page': 1,
  // 'topics.list.pagination.limit': 25,
  // 'topics.list.pagination.total': 0,
  // 'topics.list.pagination.sort': '',
  // 'list.pagination.docs': [],
  // 'list.pagination.page': 1,
  // 'list.pagination.limit': 25,
  // 'list.pagination.total': 0,
  // 'list.pagination.sort': '',
)
