import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Card, CardContent, Grid } from '@material-ui/core'
import { parseClasses } from '../util/propTypes'

import toskaLogo from '../assets/toska.png'

const TEACHER_TEXT = 'Once you\'ve received privileges from an administrator you can view and approve DEFA submissions.'
const STUDENT_TEXT = 'Once you\'ve logged in you can submit a link to your published studies in Koski.'

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

const Welcome = ({ classes }) => (
  <div>
    <Typography
      className={classes.header}
      align="center"
      variant="h2"
    >
      Welcome to DEFA-tool
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
              Teacher
            </Typography>
            <Typography>
              {TEACHER_TEXT}
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
              Student
            </Typography>
            <Typography>
              {STUDENT_TEXT}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>

    <img
      className={classes.logo}
      src={toskaLogo}
      alt="toska logo"
    />
  </div>
)

Welcome.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(Welcome)
