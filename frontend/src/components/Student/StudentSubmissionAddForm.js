import React, { PureComponent } from 'react'
import { func, string } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { withLocalize } from 'react-localize-redux'
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
import { parseClasses } from '../../util/propTypes'

const TRANSLATION_BASE = 'Student.StudentSubmissionAddForm'

const styles = {
  textFieldContainer: {
    width: '100%'
  }
}

const INITIAL_STATE = {
  expanded: false,
  loading: false,
  disableSubmit: true,
  dialogOpen: false,
  formData: {
    url: '',
    comment: ''
  }
}

const KOSKI_URL_REGEXP = new RegExp('^(http://|https://|)(www\\.|)opintopolku\\.fi/koski/opinnot/[0-9a-f]+$')

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
    const { formData, disableSubmit } = this.state
    const { value, name } = event.target
    this.setState({
      disableSubmit: name === 'url'
        ? value.length === 0
        : disableSubmit,
      formData: {
        ...formData,
        [name]: value
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
    const { token, classes, translate } = this.props
    this.translate = id => translate(`${TRANSLATION_BASE}.${id}`)
    const urlIsValid = KOSKI_URL_REGEXP.test(formData.url)
    return (
      <ExpansionPanel
        expanded={expanded}
        onChange={this.toggleExpand}
      >
        <ExpansionPanelSummary>
          <Typography>{this.translate('add_submission')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <div className={classes.textFieldContainer}>
              <TextField
                error={!urlIsValid}
                label={this.translate('url')}
                helperText={this.translate('url_helper')}
                value={formData.url}
                onChange={this.onFormChange}
                margin="normal"
                variant="outlined"
                fullWidth
                name="url"
              />
              <TextField
                label={this.translate('comment')}
                value={formData.comment}
                onChange={this.onFormChange}
                margin="normal"
                variant="outlined"
                multiline
                fullWidth
                rows={4}
                name="comment"
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
                  const onClick = urlIsValid
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
                        color={urlIsValid ? 'primary' : null}
                      >
                        {this.translate('submit')}
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
  token: string.isRequired,
  classes: parseClasses(styles).isRequired,
  translate: func.isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

const mapDispatchToProps = {
  dispatchCreateSubmission: createSubmissionAction
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(
  withLocalize(StudentSubmissionAddFormComponent)
))
