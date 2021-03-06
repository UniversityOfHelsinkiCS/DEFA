import React, { PureComponent } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'
import { CircularProgress, Typography } from '@material-ui/core'
import { getSubmissions } from '../../util/queries/getSubmissions'
import { submitSearchSuccess } from '../../util/actions/submissionSearch'
import SubmissionSearchResult from './SubmissionSearchResult'
import { parseClasses } from '../../util/propTypes'
import CardContainer from '../Student/CardContainer'
import withLocalize from '../../util/tieredLocalize'

const TRANSLATION_BASE = 'SubmissionSearch.SubmissionSearchQuery'

const styles = {
  anomalyContainer: {
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

  renderQueryError = () => {
    const { translate } = this.props
    return (
      <CardContainer
        title={translate('error_header')}
      >
        <Typography>{translate('error_text')}</Typography>
      </CardContainer>
    )
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
          if (error) {
            return (
              <div className={classes.anomalyContainer}>
                {this.renderQueryError()}
              </div>
            )
          }
          if (loading) {
            return (
              <div className={classes.anomalyContainer}>
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
  classes: parseClasses(styles).isRequired,
  translate: func.isRequired
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
)(withStyles(styles)(
  withLocalize(TRANSLATION_BASE)(SubmissionSearchQueryComponent)
))
