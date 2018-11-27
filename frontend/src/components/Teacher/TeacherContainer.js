import React from 'react'
import Typography from '@material-ui/core/Typography'
import TeacherCreditContainer from './TeacherCreditContainer'

const TeacherContainerComponent = () => (
  <div>
    <Typography align="center" variant="h2" style={{ marginTop: '20px' }}>Credits uploaded by you</Typography>
    <TeacherCreditContainer />
  </div>
)

export default TeacherContainerComponent
