import React from 'react'
import SubmissionSearchFormTextField from './SubmissionSearchFormTextField'
import SubmissionSearchQuery from './SubmissionSearchQuery'

const SubmissionSearchFormComponent = () => (
  <div>
    <div>
      <SubmissionSearchFormTextField
        label="Name"
        name="cn"
      />
      <SubmissionSearchFormTextField
        label="Student Number"
        name="studentNumber"
      />
      <SubmissionSearchFormTextField
        label="Username"
        name="username"
      />
    </div>
    <div>
      <SubmissionSearchQuery />
    </div>
  </div>
)

export default SubmissionSearchFormComponent
