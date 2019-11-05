import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, CardContent, CardHeader, TextField, Button, CardActions, FormControl, FormLabel } from '@material-ui/core'
import { ActionCreators } from './redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';



class CreateTopicCard extends React.Component {

  static mapStateToProps = (state) => {
    return {}
  }

  static mapDispatchToProps = (dispatch) => {
    const DISPATCHERS = {
      ...bindActionCreators({ ...ActionCreators }, dispatch),
      ...bindActionCreators({ ...ActionCreatorsForErrors }, dispatch)
    }
    return { DISPATCHERS }
  }

  state = {}

  handleChange = attribute => (event) => this.setState({ ...this.state, [attribute]: event.target.value })

  createTopic = () => {
    const { name, description } = this.state
    const after = () => {
      this.setState({ name: undefined, description: undefined })
      this.props.GET_TOPICS()
    }
    this.props.DISPATCHERS.CREATE_TOPIC(name, description, { onError: this.props.DISPATCHERS.SET_ERROR, after })
  }

  render() {
    const { name, description } = this.state
    return (
      <Card style={{ marginBottom: '13px' }}>
        <CardHeader
          title='Create Topic'
          subheader='The topic will be related to a test case. It will be used to track the academic topics along the courses'
        />
        <CardContent>

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
          <Button onClick={this.createTopic} > Create Topic</Button>
        </CardActions>
      </Card>
    )
  }

}

const ConnectedCreateTopicCard = connect(
  CreateTopicCard.mapStateToProps,
  CreateTopicCard.mapDispatchToProps,
)(CreateTopicCard)

export {
  ConnectedCreateTopicCard as CreateTopicCard
}