import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import AdminSearchForm from './AdminSearchForm'
import AdminSearchResult from './AdminSearchResult'
import { parseClasses } from '../../util/propTypes'

const HEADER_TEXT = 'Manage Users'

const styles = {
  header: {
    padding: '22px'
  }
}

const AdminPageComponent = ({ classes }) => (
  <div>
    <Typography
      variant="h2"
      align="center"
      className={classes.header}
    >
      {HEADER_TEXT}
    </Typography>
    <AdminSearchForm />
    <AdminSearchResult />
  </div>
)

AdminPageComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(AdminPageComponent)