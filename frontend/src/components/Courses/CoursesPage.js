import React from 'react'
import { func } from 'prop-types'
import { Typography, Card, CardContent } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import withLocalize from '../../util/tieredLocalize'
import CoursesCreateForm from './CoursesCreateForm'
import CoursesList from './CoursesList'
import { parseClasses } from '../../util/propTypes'


const styles = {
  pageContainer: {
    margin: '25px 50px 75px 25px'
  },
  header: {
    margin: '20px'
  },
  infoCard: {
    margin: '20px'
  }
}

const CoursesPageComponent = ({
  translate, classes
}) => (
  <div className={classes.pageContainer}>
    <Typography variant="h2" align="center" className={classes.header}>
      {translate('page_header')}
    </Typography>

    <Card className={classes.infoCard}>
      <CardContent>
        <Typography>
          {translate('courses_info_text')}
        </Typography>
      </CardContent>
    </Card>
    <CoursesCreateForm />
    <CoursesList />
  </div>
)

CoursesPageComponent.propTypes = {
  translate: func.isRequired,
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(withLocalize('Courses.CoursesPage')(CoursesPageComponent))
