import React, { PureComponent } from 'react'
import { func, string } from 'prop-types'
import {
  Typography,
  CircularProgress,
  TextField,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid
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
  dialogOpen: false,
  formData: {
    url: ''
  }
}

const KOSKI_URL_REGEXP = new RegExp('^(http://|https://|)(www\\.|)opintopolku\\.fi/koski/opinnot/[0-9a-f]+$')

const TEXT_FIELD_HELPER_TEXT = 'Link to your published studies in Koski service. Should look like: https://opintopolku.fi/koski/opinnot/{your unique code}'

export class StudentSubmissionAddFormComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = INITIAL_STATE
  }

  onSubmit = mutate => () => {
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

  toggleDialog = value => () => {
    this.setState({
      dialogOpen: value
    })
  }

  dialog = mutate => {
    const { dialogOpen, formData } = this.state
    return (
      <Dialog
        open={dialogOpen}
        onClose={this.toggleDialog(false)}
      >
        <DialogTitle>Confirm submit</DialogTitle>
        <DialogContent>
          <Grid container spacing={32}>
            <Grid item xs={12}>
              <Typography>
                <span>The url you provided does not match the expected format. </span>
                <span>Are you sure you want to make this submission anyway?</span>
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>
                <span>Your url: </span>
                <span>{formData.url}</span>
              </Typography>
            </Grid>
            <Grid item>
              <Button onClick={this.toggleDialog(false)} variant="contained">Cancel</Button>
            </Grid>
            <Grid item>
              <Button onClick={this.onSubmit(mutate)} variant="contained" color="primary">Confirm</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    )
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
                error={!KOSKI_URL_REGEXP.test(formData.url)}
                label="Koski URL"
                helperText={TEXT_FIELD_HELPER_TEXT}
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
                {mutate => {
                  const onClick = KOSKI_URL_REGEXP.test(formData.url)
                    ? this.onSubmit(mutate)
                    : this.toggleDialog(true)
                  return (
                    <div>
                      {this.dialog(mutate)}
                      <Button
                        type="button"
                        onClick={onClick}
                        disabled={disableSubmit}
                        variant="contained"
                        color="primary"
                      >
                        Submit
                      </Button>
                    </div>
                  )
                }}
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
