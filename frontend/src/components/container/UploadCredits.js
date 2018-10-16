import React from 'react'
import SubmitCreditsForm from '../UploadCredits/SubmitCreditsForm'
import UploadCreditsMutation from '../UploadCredits/UploadCreditsMutation'

const Credits = () => (
  <div>
    <UploadCreditsMutation UploadForm={SubmitCreditsForm} />
  </div>
)

export default Credits
