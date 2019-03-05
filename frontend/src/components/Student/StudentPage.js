import React, { PureComponent } from 'react'
import { string, func, shape } from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { withApollo } from 'react-apollo'
import { Typography, CircularProgress } from '@material-ui/core'
import { getMe } from '../../util/queries/getUsers'
import StudentContainer from './StudentContainer'
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

class StudentPageComponent extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      error: false
    }
  }

  componentDidMount() {
    const { client, token } = this.props
    client.query({
      query: getMe,
      variables: { token }
    }).then(this.onCompleted).catch(() => this.setState({ loading: false, error: true }))
  }

  onCompleted = ({ data }) => {
    const { dispatchGetStudent } = this.props
    const { me } = data.authenticate
    this.setState({ loading: false })
    dispatchGetStudent(me)
  }

  queryResult = () => {
    const { classes } = this.props
    const { loading, error } = this.state
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
      <div className={classes.resultContainer}>
        <StudentContainer />
      </div>
    )
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.pageContainer}>
        <Typography align="center" variant="h2" className={classes.header}>Your page</Typography>
        {this.queryResult()}
      </div>
    )
  }
}

StudentPageComponent.propTypes = {
  classes: parseClasses(styles).isRequired,
  token: string.isRequired,
  dispatchGetStudent: func.isRequired,
  client: shape({
    query: func.isRequired
  }).isRequired
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
)(
  withStyles(styles)(
    withApollo(StudentPageComponent)
  )
)
