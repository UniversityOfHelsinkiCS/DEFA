import React, { useState, useEffect } from 'react'
import { shape, string, func, arrayOf } from 'prop-types'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import { getDEFACourses } from '../../util/actions/DEFACourse'
import { GET_ALL_DEFA_COURSES } from '../../util/queries/DEFACourses'
import CoursesCourse from './CoursesCourse'
import { parseClasses } from '../../util/propTypes'

const styles = {
  loadingContainer: {
    textAlign: 'center'
  }
}

const CoursesListComponent = ({
  courses,
  token,
  client,
  dispatchGetDEFACourses,
  classes
}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    client.query({
      query: GET_ALL_DEFA_COURSES,
      variables: { token }
    }).then(({ data }) => {
      const results = data.authenticate.DEFACourses
      dispatchGetDEFACourses(results)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      {courses.map(course => (
        <CoursesCourse key={course.id} course={course} />
      ))}
    </div>
  )
}

CoursesListComponent.propTypes = {
  courses: arrayOf(
    shape({ id: string.isRequired })
  ).isRequired,
  token: string.isRequired,
  client: shape({
    query: func.isRequired
  }).isRequired,
  dispatchGetDEFACourses: func.isRequired,
  classes: parseClasses(styles).isRequired
}

const mapStateToProps = ({ user, courses }) => ({
  token: user.token,
  courses
})

const mapDispatchToProps = {
  dispatchGetDEFACourses: getDEFACourses
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    withApollo(CoursesListComponent)
  )
)
