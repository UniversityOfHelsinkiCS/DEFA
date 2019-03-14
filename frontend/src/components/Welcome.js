import React from 'react'
import { func } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Card, CardContent, Grid } from '@material-ui/core'
import { parseClasses } from '../util/propTypes'
import withLocalize from '../util/tieredLocalize'

import toskaLogo from '../assets/toska.png'

const styles = {
  header: {
    padding: '22px'
  },
  card: {
    padding: '12px'
  },
  logo: {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '30%'
  }
}

const Welcome = ({ classes, translate }) => (
  <div>
    <Typography
      className={classes.header}
      align="center"
      variant="h2"
    >
      {translate('welcome_message')}
    </Typography>
    <Grid
      direction="row"
      justify="center"
      alignItems="center"
      container
      spacing={16}
    >
      <Grid item>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              align="center"
              variant="h4"
            >
              {translate('teacher')}
            </Typography>
            <Typography>
              {translate('teacher_text')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item>
        <Card className={classes.card}>
          <CardContent>
            <Typography
              align="center"
              variant="h4"
            >
              {translate('student')}
            </Typography>
            <Typography>
              {translate('student_text')}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    <img
      className={classes.logo}
      src={toskaLogo}
      alt="TOSKA logo"
    />
  </div>
)

Welcome.propTypes = {
  classes: parseClasses(styles).isRequired,
  translate: func.isRequired
}

export default withStyles(styles)(
  withLocalize('Welcome')(Welcome)
)
