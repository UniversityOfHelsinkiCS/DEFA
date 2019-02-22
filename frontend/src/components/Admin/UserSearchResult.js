import React from 'react'
import { arrayOf, shape, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, CircularProgress } from '@material-ui/core'
import UserSearchResultItem from './UserSearchResultItem'
import { parseClasses } from '../../util/propTypes'

const styles = {
  progress: {
    width: '100%',
    textAlign: 'center'
  }
}

export const UserSearchResultComponent = ({ users, loading, classes }) => (
  <div>
    <div className={classes.progress}>
      {loading ? <CircularProgress /> : null}
    </div>
    <Grid container spacing={32}>
      {users.map(user => (
        <Grid
          key={user.id}
          item
          xs={12}
          lg={3}
          md={6}
          sm={12}
        >
          <UserSearchResultItem user={user} />
        </Grid>
      ))}
    </Grid>
  </div>
)

UserSearchResultComponent.propTypes = {
  users: arrayOf(shape({
    id: string.isRequired
  })).isRequired,
  loading: bool.isRequired,
  classes: parseClasses(styles).isRequired
}

const mapStateToProps = ({ admin }) => ({
  users: admin.results,
  loading: admin.loading
})

export default connect(
  mapStateToProps,
  null
)(withStyles(styles)(UserSearchResultComponent))
