import React, { PureComponent } from 'react'
import { func, string } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography,
  CircularProgress,
  TextField,
  Button,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Tooltip
} from '@material-ui/core'
import { Mutation } from 'react-apollo'
import { connect } from 'react-redux'
import { createSubmission } from '../../util/queries/createSubmission'
import { createSubmissionAction } from '../../util/actions/submission'
import { parseClasses } from '../../util/propTypes'
import withLocalize from '../../util/tieredLocalize'

const styles = {
  textFieldContainer: {
    width: '100%'
  }
}

const INITIAL_STATE = {
  expanded: false,
  loading: false,
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
    const { formData } = this.state
    const { value, name } = event.target
    this.setState({
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

  render() {
    const { formData, loading, expanded } = this.state
    const { token, classes, translate } = this.props
    const urlIsValid = KOSKI_URL_REGEXP.test(formData.url)
    return (
      <ExpansionPanel
        expanded={expanded}
        onChange={this.toggleExpand}
      >
        <ExpansionPanelSummary>
          <Typography>{translate('add_submission')}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div>
            <div className={classes.textFieldContainer}>
              <TextField
                error={!urlIsValid}
                label={translate('url')}
                helperText={
                  formData.url.includes(' ')
                    ? [
                      <div>
                        {translate('url_helper')}
                      </div>,
                      <div>
                        {translate('url_helper_whitespace')}
                      </div>
                    ] : translate('url_helper')
                }
                value={formData.url}
                onChange={this.onFormChange}
                margin="normal"
                variant="outlined"
                fullWidth
                name="url"
              />
              <TextField
                label={translate('comment')}
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
                {mutate => (
                  <Tooltip
                    title={translate('submit_tooltip')}
                    disableHoverListener={urlIsValid}
                    disableFocusListener={urlIsValid}
                    disableTouchListener={urlIsValid}
                  >
                    <span>
                      <Button
                        type="button"
                        onClick={this.onSubmit(mutate)}
                        disabled={!urlIsValid}
                        variant="contained"
                        color="primary"
                      >
                        {translate('submit')}
                      </Button>
                    </span>
                  </Tooltip>
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
  withLocalize('Student.StudentSubmissionAddForm')(StudentSubmissionAddFormComponent)
))
