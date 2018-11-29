import React from 'react'
import { Typography } from '@material-ui/core'
import SubmitCreditsForm from './SubmitCreditsForm'
import UploadCreditsMutation from './UploadCreditsMutation'

const UploadCreditsContainer = () => (
  <div>
    <Typography align="center" variant="h2" style={{ marginTop: '20px' }}>Credit upload</Typography>
    <UploadCreditsMutation UploadForm={SubmitCreditsForm} />
  </div>
)

export default UploadCreditsContainer
