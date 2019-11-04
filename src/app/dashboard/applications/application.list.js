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
    this.props.DISPATCHERS.CREATE_APPLICATION(name, description, { onError: this.props.DISPATCHERS.SET_ERROR, })
  }

  render() {

    const { name = "", description = "" } = this.state

    return (
      <Flex vertical width="100%">
        <Card style={{ marginBottom: '13px' }}>
          <CardHeader
            title='Create new Application'
            subheader='An application allows to another system to connect to the VPL API. I.E. Vpl JLib'
          />
          <CardContent>

            {this.state.error && <div>{this.state.error}</div>}

            <FormControl component="fieldset" fullWidth >
              <FormLabel component="legend">name</FormLabel>
              <TextField
                fullWidth
                value={name}
                onChange={this.handleChange('name')}
                margin="normal"
              />
            </FormControl>

            <FormControl component="fieldset" fullWidth>
              <FormLabel component="legend">Description</FormLabel>
              <TextField
                fullWidth
                value={description}
                onChange={this.handleChange('description')}
                margin="normal"
              />
            </FormControl>

          </CardContent>
          <CardActions>
            <Button onClick={this.createApplication} > Create Application</Button>
          </CardActions>
        </Card>
        <Flex vertical>


        </Flex>
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