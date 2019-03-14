import React from 'react'
import {} from 'prop-types'
import { Grid } from '@material-ui/core'
import StudentInformation from './StudentInformation'
import StudentSubmissionContainer from './StudentSubmissionContainer'

const StudentContainerComponent = () => (
  <Grid container spacing={8}>
    <Grid item xs={4}>
      <StudentInformation />
    </Grid>
    <Grid item xs={12}>
      <StudentSubmissionContainer />
    </Grid>
  </Grid>
)

export default StudentContainerComponent
