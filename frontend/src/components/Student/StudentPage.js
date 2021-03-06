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
import withLocalize from '../../util/tieredLocalize'

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

  queryError = () => {
    const { translate } = this.props
    return (
      <CardContainer
        title={translate('error_header')}
      >
        <Typography>{translate('error_text')}</Typography>
      </CardContainer>
    )
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
          {this.queryError()}
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
    const { classes, translate } = this.props
    return (
      <div className={classes.pageContainer}>
        <Typography align="center" variant="h2" className={classes.header}>{translate('header')}</Typography>
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
  }).isRequired,
  translate: func.isRequired
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
    withApollo(
      withLocalize('Student.StudentPage')(StudentPageComponent)
    )
  )
)
