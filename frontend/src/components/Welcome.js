import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, Card, CardContent, Grid } from '@material-ui/core'
import { parseClasses } from '../util/propTypes'

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
              Here you can upload your DEFA-students credits
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
              This is the place for you to check your DEFA course credits
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
