import React from 'react'
import { func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import SubmissionSearchForm from './SubmissionSearchForm'
import { parseClasses } from '../../util/propTypes'
import SubmissionSearchQuery from './SubmissionSearchQuery'
import withLocalize from '../../util/tieredLocalize'

const styles = {
  header: {
    padding: '22px'
  }
}

export const SubmissionSearchPageComponent = ({ classes, translate }) => (
  <div>
    <Typography
      variant="h2"
      align="center"
      className={classes.header}
    >
      {translate('page_header')}
    </Typography>
    <SubmissionSearchForm />
    <SubmissionSearchQuery />
  </div>
)

SubmissionSearchPageComponent.propTypes = {
  classes: parseClasses(styles).isRequired,
  translate: func.isRequired
}

export default withStyles(styles)(
  withLocalize('SubmissionSearch.SubmissionSearchPage')(SubmissionSearchPageComponent)
)
