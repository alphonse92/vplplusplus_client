import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Card, CardContent, CardHeader, TextField, Button, CardActions, FormControl, FormLabel } from '@material-ui/core'
import { ActionCreators } from './redux/actions';
import { ActionCreators as ActionCreatorsForErrors } from '../../../redux/modals/actions';
import { VplLang } from '../../../redux/lang';



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
      this.props.DISPATCHERS.GET_TOPICS()
    }
    this.props.DISPATCHERS.CREATE_TOPIC(name, description, { onError: this.props.DISPATCHERS.SET_ERROR, after })
  }

  render() {

    const { name = "", description = "" } = this.state

    return (
      <Card style={{ marginBottom: '13px' }}>
        <CardHeader
          title={<VplLang string="TOPICS_CREATE_TITLE" />}
          subheader={<VplLang string="TOPICS_CREATE_DESCRIPTION" />}
        />
        <CardContent>

          <FormControl component="fieldset" fullWidth >
            <FormLabel component="legend"><VplLang string="TOPICS_CREATE_INPUT_NAME_PLACEHOLDER" /></FormLabel>
            <TextField
              fullWidth
              value={name}
              onChange={this.handleChange('name')}
              margin="normal"
            />
          </FormControl>

          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend"><VplLang string="TOPICS_CREATE_INPUT_DESCRIPTION_PLACEHOLDER" /></FormLabel>
            <TextField
              fullWidth
              value={description}
              onChange={this.handleChange('description')}
              margin="normal"
            />
          </FormControl>

        </CardContent>
        <CardActions>
          <Button onClick={this.createTopic} ><VplLang string="TOPICS_CREATE_BUTTON" /></Button>
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