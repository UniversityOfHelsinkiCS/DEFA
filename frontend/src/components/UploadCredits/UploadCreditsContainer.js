import React from 'react'
import SubmitCreditsForm from './SubmitCreditsForm'
import UploadCreditsMutation from './UploadCreditsMutation'

const UploadCreditsContainer = () => (
  <div>
    <UploadCreditsMutation UploadForm={SubmitCreditsForm} />
  </div>
)

export default UploadCreditsContainer
