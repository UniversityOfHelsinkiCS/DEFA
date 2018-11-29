import React from 'react'
import SubmitCreditsForm from './SubmitCreditsForm'
import UploadCreditsMutation from './UploadCreditsMutation'
import UploadCreditsInfo from './UploadCreditsInfo'

const UploadCreditsContainer = () => (
  <div>
    <UploadCreditsInfo />
    <UploadCreditsMutation UploadForm={SubmitCreditsForm} />
  </div>
)

export default UploadCreditsContainer
