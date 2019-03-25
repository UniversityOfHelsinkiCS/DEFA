import React from 'react'
import { func } from 'prop-types'
import { Typography } from '@material-ui/core'
import withLocalize from '../../util/tieredLocalize'
import CoursesCreateForm from './CoursesCreateForm'
import CoursesList from './CoursesList'

const CoursesPageComponent = ({
  translate
}) => (
  <div>
    <Typography variant="h2" align="center">
      {translate('page_header')}
    </Typography>
    <CoursesCreateForm />
    <CoursesList />
  </div>
)

CoursesPageComponent.propTypes = {
  translate: func.isRequired
}

export default withLocalize('Courses.CoursesPage')(CoursesPageComponent)
