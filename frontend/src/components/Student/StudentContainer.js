import React from 'react'
import { Grid } from '@material-ui/core'
import StudentInformation from './StudentInformation'
import StudentIdentifiers from './StudentIdentifiers'
import StudentCredits from './StudentCredits'

const StudentContainerComponent = () => (
  <div>
    <Grid container spacing={8}>
      <Grid item xs={3}>
        <StudentInformation />
      </Grid>
      <Grid item xs={9}>
        <StudentIdentifiers />
      </Grid>
      <Grid item xs={12}>
        <StudentCredits />
      </Grid>
    </Grid>
  </div>
)

export default StudentContainerComponent
