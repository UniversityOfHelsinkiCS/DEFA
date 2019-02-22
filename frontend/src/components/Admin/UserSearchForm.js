import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import CardContainer from '../Student/CardContainer'
import { parseClasses } from '../../util/propTypes'
import UserSearchFormTextField from './UserSearchFormTextField'
import UserSearchQuery from './UserSearchQuery'

const styles = {
  filtersCardContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    marginBottom: '20px'
  },
  filtersCard: {
    flexShrink: 1
  },
  queryButtonContainer: {
    marginTop: '10px'
  }
}

const UserSearchForm = ({ classes }) => (
  <div className={classes.filtersCardContainer}>
    <CardContainer title="Filters" className={classes.filtersCard}>
      <Grid container spacing={16}>
        <Grid item>
          <UserSearchFormTextField
            label="Name"
            name="cn"
          />
        </Grid>
        <Grid item>
          <UserSearchFormTextField
            label="Student Number"
            name="studentNumber"
          />
        </Grid>
        <Grid item>
          <UserSearchFormTextField
            label="Username"
            name="username"
          />
        </Grid>
      </Grid>
      <div className={classes.queryButtonContainer}>
        <UserSearchQuery />
      </div>
    </CardContainer>
  </div>
)

UserSearchForm.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(UserSearchForm)
