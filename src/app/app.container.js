import React, { Component } from 'react'
import { withRouter, Switch, Route } from 'react-router'
import { Menu } from 'semantic-ui-react'
import { MainPage } from './main-page/mainPage.container';
import { LoginContainer } from './login/login.container'


const ContactUs = () => <p>contact us</p>
const Configuration = () => <p>config</p>
const Page404 = () => <p>Error  page not found</p>

const COMPONENT_REDIRECT_TO_DEFAULT = (props) => {
  props.history.push('/404')
  return <React.Fragment></React.Fragment>
}

class AppContainer extends Component {

  constructor(props) {
    super(props)
    const { match, location } = props

    this.state = {
      activePage: location.pathname.replace(match.url, '')
    }

    this.ROUTES = [
      (<Route exact path={match.url + ''} render={(props) => <LoginContainer {...props} />} />),
      (<Route exact path={match.url + 'login'} render={(props) => <LoginContainer {...props} />} />),
      // (<Route exact path={match.url + '404'} render={(props) => <Page404 {...props} />} />),
      // (<Route exact path={match.url + 'contact_us'} render={(props) => <ContactUs {...props} />} />),
      // (<Route exact path={match.url + 'configuration'} render={(props) => <Configuration {...props} />} />),
      (<Route exact path={match.url + ':404'} render={COMPONENT_REDIRECT_TO_DEFAULT} />)
    ]
  }

  go = (page = '') => () => {
    this.setState({ activePage: page })
    this.props.history.push(page)
  }
  Menu = () => (
    <Menu secondary>
      <Menu.Item
        name='Contact Us'
        active={this.state.activePage === '/contact_us'}
        onClick={this.go('/contact_us')} />
      <Menu.Item name='Configuration'
        active={this.state.activePage === '/configuration'}
        onClick={this.go('/configuration')} />
    </Menu>
  )
  render() {
    const { menu } = this
    return (
      <React.Fragment>

        <Switch>
          {
            this.ROUTES.map((route, key) => ({ ...route, key }))
          }
        </Switch>
      </React.Fragment>
    )
  }
}

export const App = withRouter(AppContainer)
