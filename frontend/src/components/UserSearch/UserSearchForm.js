import React from 'react'
import { node, func, objectOf, string } from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import CardContainer from '../Student/CardContainer'
import { parseClasses } from '../../util/propTypes'
import UserSearchFormTextField, { mapDispatchToPropsBuilder } from './UserSearchFormTextField'

const styles = {
  filtersCardContainer: {
    display: 'flex',
    flexWrap: 'nowrap',
    marginBottom: '20px'
  },
  filtersCard: {
    flexShrink: 1
  },
  queryButtonContainer: {
    marginTop: '10px'
  }
}

const UserSearchForm = ({ classes, submitButton, changeInput, fields }) => {
  const SearchFormTextField = connect(
    null,
    mapDispatchToPropsBuilder(changeInput)
  )(UserSearchFormTextField)
  return (
    <div className={classes.filtersCardContainer}>
      <CardContainer title="Filters" className={classes.filtersCard}>
        <Grid container spacing={16}>
          {Object.entries(fields).map(([name, label]) => (
            <Grid key={name} item>
              <SearchFormTextField
                label={label}
                name={name}
              />
            </Grid>
          ))}
        </Grid>
        {submitButton ? (
          <div className={classes.queryButtonContainer}>
            {submitButton}
          </div>
        ) : null}
      </CardContainer>
    </div>
  )
}

UserSearchForm.propTypes = {
  classes: parseClasses(styles).isRequired,
  submitButton: node,
  changeInput: func.isRequired,
  fields: objectOf(string.isRequired).isRequired
}

UserSearchForm.defaultProps = {
  submitButton: null
}

export default withStyles(styles)(UserSearchForm)
