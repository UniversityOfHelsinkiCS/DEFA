import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import StudentInformation from './StudentInformation'
import StudentIdentifiers from './StudentIdentifiers'
import StudentCredits from './StudentCredits'
import { parseClasses } from '../../util/propTypes'

const styles = {
  superContainer: {
    marginTop: '12px'
  }
}

const StudentContainerComponent = ({ classes }) => (
  <div>
    <Grid className={classes.superContainer} container spacing={8}>
      <Grid item xs={4}>
        <StudentInformation />
      </Grid>
      <Grid item xs={8}>
        <StudentIdentifiers />
      </Grid>
      <Grid item xs={12}>
        <StudentCredits />
      </Grid>
    </Grid>
  </div>
)

StudentContainerComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(StudentContainerComponent)
