import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Typography } from '@material-ui/core'
import StudentInformation from './StudentInformation'
import StudentIdentifierContainer from './StudentIdentifierContainer'
import StudentSubmissionContainer from './StudentSubmissionContainer'
import { parseClasses } from '../../util/propTypes'

const styles = {
  superContainer: {
    marginTop: '12px'
  }
}

const StudentContainerComponent = ({ classes }) => (
  <div style={{ margin: '25px 50px 75px 25px' }}>
    <Typography align="center" variant="h2" style={{ marginTop: '20px' }}>Your page</Typography>
    <Grid className={classes.superContainer} container spacing={8}>
      <Grid item xs={4}>
        <StudentInformation />
      </Grid>
      <Grid item xs={8}>
        <StudentIdentifierContainer />
      </Grid>
      <Grid item xs={12}>
        <StudentSubmissionContainer />
      </Grid>
    </Grid>
  </div>
)

StudentContainerComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(StudentContainerComponent)
