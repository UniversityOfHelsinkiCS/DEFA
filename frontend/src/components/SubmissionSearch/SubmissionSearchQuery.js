import React, { PureComponent } from 'react'
import { shape, string, func, bool } from 'prop-types'
import { connect } from 'react-redux'
import { ApolloConsumer } from 'react-apollo'
import { Button } from '@material-ui/core'
import { getSubmissions } from '../../util/queries/getSubmissions'
import { submitSearchAttempt, submitSearchSuccess } from '../../util/actions/submissionSearch'

export class SubmissionSearchQueryComponent extends PureComponent {
  onSubmit = client => () => {
    const { token, inputs, dispatchSubmitSearchAttempt } = this.props
    dispatchSubmitSearchAttempt()
    client.query({
      query: getSubmissions,
      variables: { token, user: inputs }
    }).then(this.onCompleted) // TODO: catch
  }

  onCompleted = ({ data }) => {
    const { dispatchSubmitSearchSuccess } = this.props
    const { submissions } = data.authenticate
    dispatchSubmitSearchSuccess(submissions)
  }

  render() {
    const { disabled } = this.props
    return (
      <ApolloConsumer>
        {client => (
          <Button
            onClick={this.onSubmit(client)}
            variant="contained"
            color="primary"
            size="large"
            disabled={disabled}
          >
            Search
          </Button>
        )}
      </ApolloConsumer>
    )
  }
}

SubmissionSearchQueryComponent.propTypes = {
  token: string.isRequired,
  inputs: shape({
    name: string,
    studentNumber: string,
    username: string
  }).isRequired,
  dispatchSubmitSearchSuccess: func.isRequired,
  dispatchSubmitSearchAttempt: func.isRequired,
  disabled: bool.isRequired
}

const mapStateToProps = ({ user, submissionSearch }) => ({
  token: user.token,
  disabled: submissionSearch.disabled,
  inputs: submissionSearch.inputs
})

const mapDispatchToProps = {
  dispatchSubmitSearchAttempt: submitSearchAttempt,
  dispatchSubmitSearchSuccess: submitSearchSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionSearchQueryComponent)
