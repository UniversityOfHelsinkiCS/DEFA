import React, { PureComponent } from 'react'
import { shape, func, object, oneOfType, arrayOf, string } from 'prop-types'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import {
  Button,
  List,
  ListItem,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  CircularProgress
} from '@material-ui/core'
import { hexadecimal, parseClasses } from '../util/propTypes'
import { getKoskiSuccess } from '../util/actions/submissionSearch'
import { getSubmissionKoski } from '../util/queries/getSubmissions'
import withLocalize from '../util/tieredLocalize'

export const context = {
  SUBMISSION_SEARCH: 0,
  STUDENT_SUBMISSIONS: 1
}

const styles = {
  errorText: { color: 'red' }
}

class SubmissionAutoParseComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = { loading: false }
  }

  onClick = () => {
    const { submission, client, token } = this.props
    client.query({
      query: getSubmissionKoski,
      variables: {
        token,
        id: submission.id
      }
    }).then(this.onCompleted).catch(this.onError)
    this.setState({ loading: true })
  }

  onCompleted = ({ data }) => {
    const { submission, dispatchGetKoskiSuccess } = this.props
    const { koski } = data.authenticate.submission
    dispatchGetKoskiSuccess({
      id: submission.id,
      koski
    })
    this.setState({ loading: false })
  }

  onError = error => {
    console.log(error)
  }

  renderCourses = () => {
    const { submission, classes, translate } = this.props
    if (submission.koski === null) {
      return (
        <Typography variant="h6" className={classes.errorText}>{translate('error_text')}</Typography>
      )
    }
    return (
      <List>
        {submission.koski.map(({ name, courses }) => (
          <ListItem key={name}>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                <Typography>{name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {courses.map(course => (
                    <ListItem key={course.name}>
                      <Typography>{`${course.name} (${course.credits} ${translate('cr')})`}</Typography>
                    </ListItem>
                  ))}
                </List>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </ListItem>
        ))}
      </List>
    )
  }

  renderButton = () => {
    const { translate } = this.props
    const { loading } = this.state
    if (loading) {
      return (
        <div>
          <CircularProgress />
          <Typography>{translate('loading_text')}</Typography>
        </div>
      )
    }
    return (
      <Button onClick={this.onClick} variant="outlined">
        {translate('parse')}
      </Button>
    )
  }

  render() {
    const { submission } = this.props
    return (
      <div>
        {
          submission.koski !== undefined
            ? this.renderCourses()
            : this.renderButton()
        }
      </div>
    )
  }
}

SubmissionAutoParseComponent.propTypes = {
  submission: shape({
    id: hexadecimal,
    koski: oneOfType([object, arrayOf(shape({}))])
  }).isRequired,
  client: shape({
    query: func.isRequired
  }).isRequired,
  dispatchGetKoskiSuccess: func.isRequired,
  token: string.isRequired,
  classes: parseClasses(styles).isRequired,
  translate: func.isRequired
}

const mapStateToProps = (
  { studentSubmissions, submissionSearch, user },
  { context: stateContext, submissionID }
) => {
  let submission
  switch (stateContext) {
    case context.SUBMISSION_SEARCH:
      submissionSearch.results.forEach(searchUser => {
        if (submission) return
        submission = searchUser.submissions.find(sub => sub.id === submissionID)
      })
      break
    case context.STUDENT_SUBMISSIONS:
      submission = studentSubmissions.submissions.find(sub => sub.id === submissionID)
      break
    default:
      submission = null
      break
  }
  return {
    submission,
    token: user.token
  }
}

const mapDispatchToProps = {
  dispatchGetKoskiSuccess: getKoskiSuccess
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withApollo(
  withStyles(styles)(
    withLocalize('SubmissionAutoParse')(SubmissionAutoParseComponent)
  )
))
