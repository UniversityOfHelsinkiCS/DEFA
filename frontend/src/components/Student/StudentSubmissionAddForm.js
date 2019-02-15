import React, { PureComponent } from 'react'
import { func, string } from 'prop-types'
import {
  Typography,
  CircularProgress,
  TextField,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from '@material-ui/core'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import { createSubmission } from '../../util/queries/createSubmission'
import { createSubmissionAction } from '../../util/actions/submission'

export const AddSubmissionText = 'Add Submission'

const INITIAL_STATE = {
  expanded: false,
  loading: false,
  disableSubmit: true,
  formData: {
    url: ''
  }
}

export class StudentSubmissionAddFormComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  onSubmit = mutate => () => {
    const { disableSubmit } = this.state
    if (disableSubmit) return
    this.setState({
      loading: true
    })
    mutate()
  }

  onCompleted = data => {
    const { dispatchCreateSubmission } = this.props
    this.setState(INITIAL_STATE)
    const submission = data.authenticate.createSubmission
    dispatchCreateSubmission(submission)
  }

  onFormChange = event => {
    const { value } = event.target
    this.setState({
      disableSubmit: value.length === 0,
      formData: {
        url: value
      }
    })
  }

  toggleExpand = () => {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded
    })
  }

  render() {
    const { formData, disableSubmit, loading, expanded } = this.state
    const { token } = this.props
    return (
      <ExpansionPanel
        expanded={expanded}
        onChange={this.toggleExpand}
      >
        <ExpansionPanelSummary>
          <Typography>{AddSubmissionText}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <div>
              <TextField
                label="Koski URL"
                value={formData.url}
                onChange={this.onFormChange}
                margin="normal"
                variant="outlined"
              />
            </div>
            <div>
              <Mutation
                mutation={createSubmission}
                variables={{
                  ...formData,
                  token
                }}
                onError={() => undefined}
                onCompleted={this.onCompleted}
              >
                {mutate => (
                  <Button
                    type="button"
                    onClick={this.onSubmit(mutate)}
                    disabled={disableSubmit}
                    variant="contained"
                    color="primary"
                  >
                    <Typography>Submit</Typography>
                  </Button>
                )}
              </Mutation>
              {loading ? <CircularProgress /> : null}
            </div>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    )
  }
}

StudentSubmissionAddFormComponent.propTypes = {
  dispatchCreateSubmission: func.isRequired,
  token: string.isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

const mapDispatchToProps = {
  dispatchCreateSubmission: createSubmissionAction
}

export default connect(mapStateToProps, mapDispatchToProps)(StudentSubmissionAddFormComponent)
