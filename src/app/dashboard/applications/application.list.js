import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, CardContent, CardHeader, IconButton, TextField, Button, CardActions, FormControl, FormLabel } from '@material-ui/core'
import {
  Delete as DeleteIcon,
} from '@material-ui/icons';
import { ActionCreators } from './redux/actions';
import { Flex } from '../../../lib/components/flex'
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';
import { VplLang } from '../../../redux/lang';



const Application = (onDeleteApp = () => true) => (app) => {
  const { _id, name, description, token } = app
  return (
    <Card key={_id} style={{ marginBottom: '13px' }}>
      <CardHeader
        action={<IconButton onClick={() => onDeleteApp(app)}><DeleteIcon /></IconButton>}
        title={name}
        subheader={description}
      />
      <CardContent>
        <p style={{ wordBreak: 'break-all' }}>{token}</p>
      </CardContent>
    </Card>
  )
}



class ApplicationList extends React.Component {

  static mapStateToProps = (state) => {
    const { applications = {} } = state
    const { list = [], error } = applications
    return { applications: list, error }
  }

  static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators }, dispatch),
      ...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch)
    }
    return { DISPATCHERS }
  }

  state = {}

  componentDidMount() {
    this.props.DISPATCHERS.GET_APPLICATIONS()
  }

  handleDeleteApp = (app) => {
    this.props.DISPATCHERS.DELETE_APPLICATION(app._id)
  }

  handleChange = attribute => (event) => this.setState({ ...this.state, [attribute]: event.target.value })

  createApplication = () => {
    const { name, description } = this.state
    const after = () => this.setState({ name: undefined, description: undefined })
    this.props.DISPATCHERS.CREATE_APPLICATION(name, description, { onError: this.props.DISPATCHERS.SET_ERROR, after })
  }

  render() {

    const { name = "", description = "" } = this.state

    return (
      <Flex vertical width="100%">
        <Card style={{ marginBottom: '13px' }}>
          <CardHeader
            title={<VplLang string="APPLICATIONS_CREATE_APP_TITLE" />}
            subheader={<VplLang string="APPLICATIONS_CREATE_APP_DESCRIPTION" />}
          />
          <CardContent>

            {this.state.error && <div>{this.state.error}</div>}

            <FormControl component="fieldset" fullWidth >
              <FormLabel component="legend">
                <VplLang string="APPLICATIONS_CREATE_APP_INPUT_NAME_PLACEHOLDER" />
              </FormLabel>
              <TextField
                fullWidth
                value={name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
            </FormControl>

            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend"><VplLang string="APPLICATIONS_CREATE_APP_INPUT_DESCRIPTION_PLACEHOLDER" /></FormLabel>
              <TextField
                fullWidth
                value={description}
                onChange={this.handleChange('description')}
                margin="normal"
              />
            </FormControl>

          </CardContent>
          <CardActions>
            <Button onClick={this.createApplication} > <VplLang string="APPLICATIONS_CREATE_APP_BUTTON" /></Button>
          </CardActions>
        </Card>

        {this.props.applications.map(Application(this.handleDeleteApp))}
      </Flex>
    )
  }

}

const ConnectedApplicationList = connect(
  ApplicationList.mapStateToProps,
  ApplicationList.mapDispatchToProps,
)(ApplicationList)

export {
  ConnectedApplicationList as ApplicationList
}