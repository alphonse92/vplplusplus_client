
import { connect } from 'react-redux'
import { Languages } from '../../lang'

const mapStateToProps = (state) => ({ lang: state.lang.lang })
const mapDispatchToProps = () => ({})
const NoConnectedLang = (props) => {

  const { string, lang } = props
  const langStrings = Languages[lang];

  if (!langStrings) {
    console.error("Lang strings found for ", lang)
    return "NO_LANG"
  }

  const val = langStrings[string];
  if (!val) {
    console.error('NO LANG FOUND', { string, lang })
    return "NO_STRING"
  }
  
  return val.toString()
}

export const VplLang = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoConnectedLang)
