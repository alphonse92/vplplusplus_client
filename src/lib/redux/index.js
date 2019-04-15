

const REQUEST_STATUS_SCHEMA = {
  init: {
    prefix: '',
    postfix: '',
    reducer_default: (state, action) => ({ ...state, loading: true, })
  },
  fullfilled: {
    prefix: '',
    postfix: '_FULFILLED',
    reducer_default: (state, action) => ({ ...state, loading: false })
  },
  rejected: {
    prefix: '',
    postfix: '_REJECTED',
    reducer_default: (state, action) => ({ ...state, loading: false, error: action.payload, })
  },
}

export function createRequestActions(name_action, reducers) {
  const ActionObjectWithReducer = Object
    .keys(REQUEST_STATUS_SCHEMA)
    .reduce((obj, requestStatusName) => {
      const { prefix, postfix, reducer_default } = REQUEST_STATUS_SCHEMA[requestStatusName]
      const reducer = reducers[requestStatusName]
      const userSetReducer = reducer && typeof reducer === 'function'
      const finalReducer = userSetReducer
        ? function callSetedReducer(state, action) { return reducer(reducer_default(state, action), action) }
        : function callDefaultReducer(state, action) { return reducer_default(state, action) }

      obj[requestStatusName] = {
        name: `${prefix}${name_action}${postfix}`,
        reducer: finalReducer
      }
      return obj
    }, {})

  return ActionObjectWithReducer
}

export function getReducerMap(ActionsObject) {
  return Object
    .keys(ActionsObject)
    .reduce((mapOfReducers, actionName) => {
      const { ACTIONS } = ActionsObject[actionName]
      Object
        .keys(ACTIONS)
        .forEach(ActionStatusName => {
          const ActionStatus = ACTIONS[ActionStatusName]
          mapOfReducers[ActionStatus.name] = ActionStatus.reducer
        })
      return mapOfReducers
    }, {})
}

export function extractActionCreators(ActionsObject) {
  return Object
    .keys(ActionsObject)
    .reduce((AllActionCreators, ActionName) => {
      const ActionObject = ActionsObject[ActionName]
      AllActionCreators[ActionName] = ActionObject.DISPATCHER
      return AllActionCreators
    }, {})
}