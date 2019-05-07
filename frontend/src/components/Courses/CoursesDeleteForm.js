import React from 'react'
import { func, string, shape } from 'prop-types'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { Button } from '@material-ui/core'
import withLocalize from '../../util/tieredLocalize'
import { deleteDEFACourse } from '../../util/actions/DEFACourse'
import { DELETE_DEFA_COURSE } from '../../util/queries/DEFACourses'

const CoursesDeleteFormComponent = ({
  course,
  translate,
  client,
  token,
  dispatchDeleteDEFACourse
}) => {
  const onClick = () => {
    dispatchDeleteDEFACourse(course)
    client.mutate({
      mutation: DELETE_DEFA_COURSE,
      variables: {
        token,
        id: course.id
      }
    })
  }

  return (
    <Button
      type="button"
      onClick={onClick}
      variant="contained"
    >
      {translate('delete')}
    </Button>
  )
}

CoursesDeleteFormComponent.propTypes = {
  course: shape({
    id: string.isRequired
  }).isRequired,
  client: shape({
    mutate: func.isRequired
  }).isRequired,
  translate: func.isRequired,
  token: string.isRequired,
  dispatchDeleteDEFACourse: func.isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

const mapDispatchToProps = {
  dispatchDeleteDEFACourse: deleteDEFACourse
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withLocalize('Courses.CoursesDeleteForm')(
    withApollo(CoursesDeleteFormComponent)
  )
)
