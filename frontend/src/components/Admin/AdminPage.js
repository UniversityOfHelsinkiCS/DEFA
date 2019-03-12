import React from 'react'
import { func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import AdminSearchForm from './AdminSearchForm'
import AdminSearchResult from './AdminSearchResult'
import { parseClasses } from '../../util/propTypes'
import withLocalize from '../../util/tieredLocalize'

const styles = {
  header: {
    padding: '22px'
  }
}

const AdminPageComponent = ({ classes, translate }) => (
  <div>
    <Typography
      variant="h2"
      align="center"
      className={classes.header}
    >
      {translate('page_header')}
    </Typography>
    <AdminSearchForm />
    <AdminSearchResult />
  </div>
)

AdminPageComponent.propTypes = {
  classes: parseClasses(styles).isRequired,
  translate: func.isRequired
}

export default withStyles(styles)(
  withLocalize('Admin.AdminPage')(AdminPageComponent)
)
