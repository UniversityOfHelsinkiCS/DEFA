import React from 'react'
import { shape, arrayOf, string } from 'prop-types'
import { connect } from 'react-redux'
import StudentSubmission from './StudentSubmission'

const StudentSubmissionListComponent = ({ submissions }) => submissions.map(submission => (
  <StudentSubmission
    key={submission.id}
    submission={submission}
  />
))

StudentSubmissionListComponent.propTypes = {
  submissions: arrayOf(shape({
    id: string.isRequired,
    url: string.isRequired
  })).isRequired
}

const mapStateToProps = ({ studentSubmissions }) => ({
  submissions: studentSubmissions.submissions
})

export default connect(mapStateToProps, null)(StudentSubmissionListComponent)