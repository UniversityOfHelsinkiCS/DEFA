import React, { useState } from 'react'
import { func, string, shape } from 'prop-types'
import { connect } from 'react-redux'
import { withApollo } from 'react-apollo'
import { TextField, Typography, Button } from '@material-ui/core'
import withLocalize from '../../util/tieredLocalize'
import { createDEFACourse } from '../../util/actions/DEFACourse'
import { CREATE_DEFA_COURSE } from '../../util/queries/DEFACourses'

const CoursesCreateFormComponent = ({
  translate,
  dispatchCreateDEFACourse,
  client,
  token
}) => {
  const [name, setName] = useState({
    en: '',
    fi: '',
    sv: ''
  })
  const onChange = field => ({ target }) => setName({
    ...name,
    [field]: target.value
  })
  const submit = () => {
    client.mutate({
      mutation: CREATE_DEFA_COURSE,
      variables: {
        token,
        name
      }
    }).then(({ data }) => {
      const created = data.authenticate.createDEFACourse
      dispatchCreateDEFACourse(created)
    })
  }

  return (
    <div>
      <div>
        <Typography>{translate('name')}</Typography>
        <div>
          <TextField
            label="en"
            onChange={onChange('en')}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            label="fi"
            onChange={onChange('fi')}
            variant="outlined"
          />
        </div>
        <div>
          <TextField
            label="sv"
            onChange={onChange('sv')}
            variant="outlined"
          />
        </div>
      </div>
      <div>
        <Button type="button" onClick={submit}>
          {translate('create')}
        </Button>
      </div>
    </div>
  )
}

CoursesCreateFormComponent.propTypes = {
  translate: func.isRequired,
  dispatchCreateDEFACourse: func.isRequired,
  token: string.isRequired,
  client: shape({
    mutate: func.isRequired
  }).isRequired
}

const mapDispatchToProps = {
  dispatchCreateDEFACourse: createDEFACourse
}

const mapStateToProps = ({ user }) => ({
  token: user.token
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withLocalize('Courses.CoursesCreateForm')(
    withApollo(CoursesCreateFormComponent)
  )
)
