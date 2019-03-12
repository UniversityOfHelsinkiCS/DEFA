import React, { PureComponent } from 'react'
import { shape, string, func } from 'prop-types'
import { connect } from 'react-redux'
import { ApolloConsumer } from 'react-apollo'
import { CircularProgress } from '@material-ui/core'
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab'
import { approveSubmission } from '../../util/queries/editSubmissions'
import { approveSubmissionSuccess } from '../../util/actions/submissionSearch'
import withLocalize from '../../util/tieredLocalize'

class SubmissionApproveMutationComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  onChange = (client, value) => () => {
    const { token, submission } = this.props
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
    const { submission, translate } = this.props
    const { loading } = this.state
    return (
      <ApolloConsumer>
        {client => (
          loading ? <CircularProgress /> : (
            <ToggleButtonGroup
              exclusive
            >
              <ToggleButton
                style={{
                  // These styles somehow don't work when applied as material-ui classes.
                  backgroundColor: submission.approval === 'PENDING' ? 'orange' : null
                }}
                value="PENDING"
                selected={submission.approval === 'PENDING'}
                onClick={this.onChange(client, 'PENDING')}
              >
                {translate('pending')}
              </ToggleButton>
              <ToggleButton
                style={{ backgroundColor: submission.approval === 'APPROVED' ? '#4cd642' : null }}
                value="APPROVED"
                selected={submission.approval === 'APPROVED'}
                onClick={this.onChange(client, 'APPROVED')}
              >
                {translate('approved')}
              </ToggleButton>
              <ToggleButton
                style={{ backgroundColor: submission.approval === 'REJECTED' ? 'red' : null }}
                value="REJECTED"
                selected={submission.approval === 'REJECTED'}
                onClick={this.onChange(client, 'REJECTED')}
              >
                {translate('rejected')}
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
  dispatchApproveSubmissionSuccess: func.isRequired,
  translate: func.isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

const mapDispatchToProps = {
  dispatchApproveSubmissionSuccess: approveSubmissionSuccess
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withLocalize('SubmissionSearch.SubmissionApproveMutation')(SubmissionApproveMutationComponent)
)
