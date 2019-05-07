import React, { useState } from 'react'
import { func, shape, string, bool } from 'prop-types'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField
} from '@material-ui/core'
import {
  ToggleButtonGroup,
  ToggleButton
} from '@material-ui/lab'
import withLocalize from '../../util/tieredLocalize'
import { editDEFACourse } from '../../util/actions/DEFACourse'
import { UPDATE_DEFA_COURSE } from '../../util/queries/DEFACourses'

const CourseEditFormComponent = ({
  translate,
  course,
  dispatchEditDEFACourse,
  setEditing,
  client,
  token
}) => {
  const [name, setName] = useState(course.name)
  const [required, setRequired] = useState(course.required)

  const submit = () => {
    dispatchEditDEFACourse({
      id: course.id,
      name,
      required
    })
    setEditing(false)
    client.mutate({
      mutation: UPDATE_DEFA_COURSE,
      variables: {
        id: course.id,
        name,
        required,
        token
      }
    })
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{translate('name')}</Typography>
        <div>
          <div>
            <TextField
              onChange={({ target: { value } }) => setName({ ...name, en: value })}
              value={name.en}
              variant="outlined"
              label="en"
            />
          </div>
          <div>
            <TextField
              onChange={({ target: { value } }) => setName({ ...name, fi: value })}
              value={name.fi}
              variant="outlined"
              label="fi"
            />
          </div>
          <div>
            <TextField
              onChange={({ target: { value } }) => setName({ ...name, sv: value })}
              value={name.sv}
              variant="outlined"
              label="sv"
            />
          </div>
        </div>
        <div>
          <ToggleButtonGroup exclusive>
            <ToggleButton
              value
              onClick={() => setRequired(true)}
              selected={required}
            >
              {translate('required')}
            </ToggleButton>
            <ToggleButton
              value={false}
              onClick={() => setRequired(false)}
              selected={!required}
            >
              {translate('not_required')}
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
        <div>
          <Button
            onClick={submit}
            color="primary"
            variant="contained"
          >
            {translate('save')}
          </Button>
          <Button
            onClick={() => setEditing(false)}
            variant="contained"
          >
            {translate('cancel')}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

CourseEditFormComponent.propTypes = {
  translate: func.isRequired,
  course: shape({
    id: string.isRequired,
    name: shape({
      en: string.isRequired,
      fi: string.isRequired,
      sv: string.isRequired
    }).isRequired,
    required: bool.isRequired
  }).isRequired,
  dispatchEditDEFACourse: func.isRequired,
  setEditing: func.isRequired,
  client: shape({
    mutate: func.isRequired
  }).isRequired,
  token: string.isRequired
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

const mapDispatchToProps = {
  dispatchEditDEFACourse: editDEFACourse
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withApollo(
    withLocalize('Courses.CoursesEditForm')(CourseEditFormComponent)
  )
)
