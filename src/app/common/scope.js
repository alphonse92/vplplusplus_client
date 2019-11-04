import { connect } from 'react-redux'
import { UserService } from '../../services/user';

function validate(scopeMap = {}, allow = []) {
  const scopesToAllow = Array.isArray(allow)
    ? allow
    : [allow]
  const isAllowed = scopesToAllow.reduce((acc, scopeToValide) => acc && scopeMap[scopeToValide], true)
  return isAllowed;
}

 const scopeStatic = (allow = []) => {
  const userLogged = UserService.getUserLogged();
  const { scopeMap } = userLogged;
  return validate(scopeMap, allow)
}

const mapStateToProps = (state) => ({ scopeMap: state.user.scopeMap })
const mapDispatchToProps = (dispatch) => ({})

const Scope = (props) => {
  const { children, scopeMap = {}, allow = [] } = props
  const isAllowed = validate(scopeMap, allow)
  return isAllowed ? children : null
}

const ConnectedScope = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scope)


export {
  ConnectedScope as Scope,
  scopeStatic
}
