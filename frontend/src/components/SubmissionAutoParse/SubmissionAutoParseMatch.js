import React from 'react'
import { shape, number, string, func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import {
  Typography
} from '@material-ui/core'
import { parseClasses } from '../../util/propTypes'
import withLocalize from '../../util/tieredLocalize'

const styles = {
  successText: {
    color: 'green'
  },
  maybeText: {
    color: 'orange'
  },
  failureText: {
    color: 'red'
  }
}

const SubmissionAutoParseMatchComponent = ({
  translate,
  match: { DEFACourse, distance, bestMatch },
  classes
}) => {
  if (distance === 0) {
    return (
      <div>
        <Typography
          className={classes.successText}
        >
          {DEFACourse.name.fi}
        </Typography>
      </div>
    )
  }
  if (distance <= 10) {
    return (
      <div>
        <div>
          <Typography
            className={classes.maybeText}
          >
            {DEFACourse.name.fi}
          </Typography>
        </div>
        <div>
          <Typography>{`${translate('best_match')}: ${bestMatch}`}</Typography>
        </div>
      </div>
    )
  }
  return (
    <div>
      <Typography
        className={classes.failureText}
      >
        {DEFACourse.name.fi}
      </Typography>
      {DEFACourse.required ? (
        <Typography className={classes.failureText}>{translate('required_warning')}</Typography>
      ) : null}
    </div>
  )
}

SubmissionAutoParseMatchComponent.propTypes = {
  match: shape({
    DEFACourse: shape({
      name: shape({
        en: string.isRequired,
        fi: string.isRequired
      }).isRequired
    }).isRequired,
    distance: number,
    bestMatch: string
  }).isRequired,
  translate: func.isRequired,
  classes: parseClasses(styles).isRequired
}

export default withLocalize('SubmissionAutoParse.SubmissionAutoParseMatch')(
  withStyles(styles)(SubmissionAutoParseMatchComponent)
)
