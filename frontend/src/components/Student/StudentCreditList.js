import React from 'react'
import { arrayOf } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography } from '@material-ui/core'
import CreditT from '../CreditTable'
import { parseClasses, creditProp } from '../../util/propTypes'

const styles = {
  anomaly: {
    textAlign: 'center'
  }
}

export const noCreditsMessage = 'You have no credits.'

export const StudentCreditListComponent = ({ credits, classes }) => {
  if (credits.length === 0) {
    return (
      <div className={classes.anomaly}>
        <Typography>{noCreditsMessage}</Typography>
      </div>
    )
  }
  return <CreditT credits={credits} />
}

StudentCreditListComponent.propTypes = {
  credits: arrayOf(creditProp).isRequired,
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(StudentCreditListComponent)
