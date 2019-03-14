
import React, { PureComponent } from 'react'
import { shape, string, func, bool } from 'prop-types'
import { connect } from 'react-redux'
import { ApolloConsumer } from 'react-apollo'
import { Button } from '@material-ui/core'
import { getUsers } from '../../util/queries/getUsers'
import { submitSearchAttempt, submitSearchSuccess } from '../../util/actions/admin'
import withLocalize from '../../util/tieredLocalize'

export class AdminSearchQueryComponent extends PureComponent {
  onSubmit = client => () => {
    const { token, inputs, dispatchSubmitSearchAttempt } = this.props
    dispatchSubmitSearchAttempt()
    client.query({
      query: getUsers,
      variables: { token, user: inputs }
    }).then(this.onCompleted) // TODO: catch
  }

  onCompleted = ({ data }) => {
    const { dispatchSubmitSearchSuccess } = this.props
    const users = data.authenticate.users.map(({ __typename, ...values }) => ({ ...values }))
    dispatchSubmitSearchSuccess(users)
  }

  render() {
    const { disabled, translate } = this.props
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
            {translate('search')}
          </Button>
        )}
      </ApolloConsumer>
    )
  }
}

AdminSearchQueryComponent.propTypes = {
  token: string.isRequired,
  inputs: shape({
    name: string,
    studentNumber: string,
    username: string
  }).isRequired,
  dispatchSubmitSearchSuccess: func.isRequired,
  dispatchSubmitSearchAttempt: func.isRequired,
  disabled: bool.isRequired,
  translate: func.isRequired
}

const mapStateToProps = ({ user, admin }) => ({
  token: user.token,
  disabled: admin.disabled,
  inputs: admin.inputs
})

const mapDispatchToProps = {
  dispatchSubmitSearchAttempt: submitSearchAttempt,
  dispatchSubmitSearchSuccess: submitSearchSuccess
}

export default connect(mapStateToProps, mapDispatchToProps)(
  withLocalize('Admin.AdminSearchQuery')(AdminSearchQueryComponent)
)
