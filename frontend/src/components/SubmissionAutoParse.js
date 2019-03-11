import React, { PureComponent } from 'react'
import { shape, func, object, oneOfType, arrayOf, string } from 'prop-types'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
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
import { hexadecimal } from '../util/propTypes'
import { getKoskiSuccess } from '../util/actions/submissionSearch'
import { getSubmissionKoski } from '../util/queries/getSubmissions'

export const context = {
  SUBMISSION_SEARCH: 0,
  STUDENT_SUBMISSIONS: 1
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
    const { submission } = this.props
    if (submission.koski === null) {
      return (
        <Typography variant="h6">Could not parse courses from provided url.</Typography>
      )
    }
    return (
      <List>
        {submission.koski.map(({ name, courses }) => (
          <ListItem>
            <ExpansionPanel>
              <ExpansionPanelSummary>
                <Typography>{name}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <List>
                  {courses.map(course => (
                    <ListItem>
                      <Typography>{`${course.name} (${course.credits} cr)`}</Typography>
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
    const { loading } = this.state
    if (loading) {
      return (
        <CircularProgress />
      )
    }
    return (
      <Button onClick={this.onClick} variant="outlined">
        Parse courses
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
  token: string.isRequired
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
      submission = studentSubmissions.find(sub => sub.id === submissionID)
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
)(withApollo(SubmissionAutoParseComponent))
