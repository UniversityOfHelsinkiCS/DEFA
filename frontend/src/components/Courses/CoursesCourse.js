import React from 'react'
import { shape, string, func, bool } from 'prop-types'
import { Typography, Card, CardContent } from '@material-ui/core'
import withLocalize from '../../util/tieredLocalize'

const CoursesCourseComponent = ({
  course,
  translate
}) => (
  <Card>
    <CardContent>
      <Typography variant="h6">{translate('name')}</Typography>
      <div>
        <div>
          <Typography>{`en: ${course.name.en}`}</Typography>
        </div>
        <div>
          <Typography>{`fi: ${course.name.fi}`}</Typography>
        </div>
        <div>
          <Typography>{`sv: ${course.name.sv}`}</Typography>
        </div>
      </div>
      {course.required ? (
        <Typography>{translate('required')}</Typography>
      ) : (
        <Typography>{translate('not_required')}</Typography>
      )}
    </CardContent>
  </Card>
)

CoursesCourseComponent.propTypes = {
  course: shape({
    name: shape({
      en: string.isRequired,
      fi: string.isRequired,
      sv: string.isRequired
    }).isRequired,
    required: bool.isRequired
  }).isRequired,
  translate: func.isRequired
}

export default withLocalize('Courses.Course')(CoursesCourseComponent)
