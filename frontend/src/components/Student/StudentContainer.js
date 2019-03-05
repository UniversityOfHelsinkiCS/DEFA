import React, { Component } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'
import { Grid, Typography, CircularProgress } from '@material-ui/core'
import { getMe } from '../../util/queries/getUsers'
import StudentInformation from './StudentInformation'
import StudentSubmissionContainer from './StudentSubmissionContainer'
import { parseClasses } from '../../util/propTypes'
import { getStudent } from '../../util/actions/submission'
import CardContainer from './CardContainer'

const styles = {
  pageContainer: {
    margin: '25px 50px 75px 25px'
  },
  header: {
    marginTop: '20px'
  },
  resultContainer: {
    marginTop: '12px'
  },
  anomaly: {
    textAlign: 'center'
  }
}

const QueryLoading = () => <CircularProgress />

const ERROR_HEADER = 'Error'
const ERROR_TEXT = 'Failed to load user data. Refresh the page to try again.'

const QueryError = () => (
  <CardContainer
    title={ERROR_HEADER}
  >
    <Typography>{ERROR_TEXT}</Typography>
  </CardContainer>
)

class StudentContainerComponent extends Component {
  // This method keeps this component from updating in an infinite loop.
  // TODO: Refactor to not be hacky.
  shouldComponentUpdate(newProps) {
    const { token } = this.props
    return newProps.token !== token
  }

  onCompleted = data => {
    const { dispatchGetStudent } = this.props
    const { me } = data.authenticate
    dispatchGetStudent(me)
  }

  render() {
    const { classes, token } = this.props
    return (
      <div className={classes.pageContainer}>
        <Typography align="center" variant="h2" className={classes.header}>Your page</Typography>
        <Query
          query={getMe}
          variables={{ token }}
          onCompleted={this.onCompleted}
        >
          {({ loading, error }) => {
            try {
              if (loading) {
                return (
                  <div className={[classes.anomaly, classes.resultContainer].join(' ')}>
                    <QueryLoading />
                  </div>
                )
              }
              if (error) {
                return (
                  <div className={[classes.anomaly, classes.resultContainer].join(' ')}>
                    <QueryError />
                  </div>
                )
              }
              return (
                <Grid className={classes.resultContainer} container spacing={8}>
                  <Grid item xs={4}>
                    <StudentInformation />
                  </Grid>
                  <Grid item xs={12}>
                    <StudentSubmissionContainer />
                  </Grid>
                </Grid>
              )
            } catch (e) {
              return <QueryError className={classes.anomaly} />
            }
          }}
        </Query>
      </div>
    )
  }
}

StudentContainerComponent.propTypes = {
  classes: parseClasses(styles).isRequired,
  token: string.isRequired,
  dispatchGetStudent: func.isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

const mapDispatchToProps = {
  dispatchGetStudent: getStudent
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(StudentContainerComponent))
