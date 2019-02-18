import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import SubmissionSearchForm from './SubmissionSearchForm'
import SubmissionSearchResult from './SubmissionSearchResult'
import { parseClasses } from '../../util/propTypes'

const styles = {
  header: {
    padding: '22px'
  }
}

export const SubmissionSearchPageComponent = ({ classes }) => (
  <div>
    <Typography
      variant="h2"
      align="center"
      className={classes.header}
    >
      View DEFA submissions
    </Typography>
    <SubmissionSearchForm />
    <SubmissionSearchResult />
  </div>
)

SubmissionSearchPageComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(SubmissionSearchPageComponent)
