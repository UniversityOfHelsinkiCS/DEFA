import React, { PureComponent } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'
import { CircularProgress } from '@material-ui/core'
import { getSubmissions } from '../../util/queries/getSubmissions'
import { submitSearchSuccess } from '../../util/actions/submissionSearch'
import SubmissionSearchResult from './SubmissionSearchResult'
import { parseClasses } from '../../util/propTypes'

const styles = {
  progressContainer: {
    width: '100%',
    textAlign: 'center'
  }
}

export class SubmissionSearchQueryComponent extends PureComponent {
  onCompleted = data => {
    const { dispatchSubmitSearchSuccess } = this.props
    const { users } = data.authenticate
    dispatchSubmitSearchSuccess(users)
  }

  render() {
    const { token, classes } = this.props
    return (
      <Query
        query={getSubmissions}
        variables={{ token }}
        onCompleted={this.onCompleted}
      >
        {({ loading, error }) => {
          if (error) return null
          if (loading) {
            return (
              <div className={classes.progressContainer}>
                <CircularProgress />
              </div>
            )
          }
          return <SubmissionSearchResult />
        }}
      </Query>
    )
  }
}

SubmissionSearchQueryComponent.propTypes = {
  token: string.isRequired,
  dispatchSubmitSearchSuccess: func.isRequired,
  classes: parseClasses(styles).isRequired
}

const mapStateToProps = ({ user, submissionSearch }) => ({
  token: user.token,
  disabled: submissionSearch.disabled,
  inputs: submissionSearch.inputs
})

const mapDispatchToProps = {
  dispatchSubmitSearchSuccess: submitSearchSuccess
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SubmissionSearchQueryComponent))
