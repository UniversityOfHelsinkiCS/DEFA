import React from 'react'
import { shape, arrayOf } from 'prop-types'
import { connect } from 'react-redux'
import StudentSubmission from './StudentSubmission'
import { hexadecimal } from '../../util/propTypes'

const StudentSubmissionListComponent = ({ submissions }) => submissions.map(submission => (
  <StudentSubmission
    key={submission.id}
    submission={submission}
  />
))

StudentSubmissionListComponent.propTypes = {
  submissions: arrayOf(shape({
    id: hexadecimal.isRequired
  })).isRequired
}

const mapStateToProps = ({ studentSubmissions }) => ({
  submissions: studentSubmissions.submissions
})

export default connect(mapStateToProps, null)(StudentSubmissionListComponent)
