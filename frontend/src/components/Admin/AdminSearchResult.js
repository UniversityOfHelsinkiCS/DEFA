import React from 'react'
import { arrayOf, shape, bool } from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid, CircularProgress } from '@material-ui/core'
import AdminSearchResultItem from './AdminSearchResultItem'
import { parseClasses, hexadecimal } from '../../util/propTypes'

const styles = {
  progress: {
    width: '100%',
    textAlign: 'center'
  }
}

export const AdminSearchResultComponent = ({ users, loading, classes }) => (
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
          <AdminSearchResultItem user={user} />
        </Grid>
      ))}
    </Grid>
  </div>
)

AdminSearchResultComponent.propTypes = {
  users: arrayOf(shape({
    id: hexadecimal.isRequired
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
)(withStyles(styles)(AdminSearchResultComponent))
