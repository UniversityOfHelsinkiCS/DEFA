import React from 'react'
import { Grid } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import SubmissionSearchFormTextField from './SubmissionSearchFormTextField'
import SubmissionSearchQuery from './SubmissionSearchQuery'
import CardContainer from '../Student/CardContainer'
import { parseClasses } from '../../util/propTypes'

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

export const SubmissionSearchFormComponent = ({ classes }) => (
  <div className={classes.filtersCardContainer}>
    <CardContainer title="Filters" className={classes.filtersCard}>
      <Grid container spacing={16}>
        <Grid item>
          <SubmissionSearchFormTextField
            label="Name"
            name="cn"
          />
        </Grid>
        <Grid item>
          <SubmissionSearchFormTextField
            label="Student Number"
            name="studentNumber"
          />
        </Grid>
        <Grid item>
          <SubmissionSearchFormTextField
            label="Username"
            name="username"
          />
        </Grid>
      </Grid>
      <div className={classes.queryButtonContainer}>
        <SubmissionSearchQuery />
      </div>
    </CardContainer>
  </div>
)

SubmissionSearchFormComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(SubmissionSearchFormComponent)
