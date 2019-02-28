import React, { PureComponent } from 'react'
import { shape, string, func } from 'prop-types'
import { connect } from 'react-redux'
import { ApolloConsumer } from 'react-apollo'
import { CircularProgress } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { approveSubmission } from '../../util/queries/editSubmissions'
import { approveSubmissionSuccess } from '../../util/actions/submissionSearch'

const PENDING_TEXT = 'PENDING'
const APPROVED_TEXT = 'APPROVED'
const REJECTED_TEXT = 'REJECTED'

class SubmissionApproveMutationComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  onChange = client => event => {
    const { token, submission } = this.props
    const { value } = event.target
    if (value === submission.approval) return
    client.mutate({
      mutation: approveSubmission,
      variables: {
        token,
        submission: submission.id,
        approval: value
      }
    }).then(this.onComplete)
    this.setState({ loading: true })
  }

  onComplete = response => {
    const { dispatchApproveSubmissionSuccess } = this.props
    const { approveSubmission: submission } = response.data.authenticate
    dispatchApproveSubmissionSuccess(submission)
    this.setState({ loading: false })
  }

  render() {
    const { submission } = this.props
    const { loading } = this.state
    return (
      <ApolloConsumer>
        {client => (
          loading ? <CircularProgress /> : (
            <ToggleButtonGroup
              exclusive
              onChange={this.onChange(client)}
            >
              <ToggleButton
                value="PENDING"
                selected={submission.approval === 'PENDING'}
              >
                {PENDING_TEXT}
              </ToggleButton>
              <ToggleButton
                value="APPROVED"
                selected={submission.approval === 'APPROVED'}
                color="primary"
              >
                {APPROVED_TEXT}
              </ToggleButton>
              <ToggleButton
                value="REJECTED"
                selected={submission.approval === 'REJECTED'}
                color="secondary"
              >
                {REJECTED_TEXT}
              </ToggleButton>
            </ToggleButtonGroup>
          )
        )}
      </ApolloConsumer>
    )
  }
}

SubmissionApproveMutationComponent.propTypes = {
  submission: shape({
    approval: string.isRequired
  }).isRequired,
  token: string.isRequired,
  dispatchApproveSubmissionSuccess: func.isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

const mapDispatchToProps = {
  dispatchApproveSubmissionSuccess: approveSubmissionSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionApproveMutationComponent)
