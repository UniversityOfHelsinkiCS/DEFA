import React from 'react'
import { Typography, Card, CardContent, Grid } from '@material-ui/core'

import toskaLogo from '../assets/toska.png'

const Welcome = () => (
  <div>
    <Typography
      style={{ padding: '22px' }}
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
        <Card style={{ padding: '12px' }}>
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
        <Card style={{ padding: '12px' }}>
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
      src={toskaLogo}
      alt="toska logo"
      style={{
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '30%'
      }}
    />
  </div>
)

export default Welcome
