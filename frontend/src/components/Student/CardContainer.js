import React from 'react'
import { node, string } from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { secondary } from '../../common/colors'
import { parseClasses } from '../../util/propTypes'

const styles = {
  cardHeader: {
    backgroundColor: secondary.main
  }
}

const CardContainerComponent = ({ title, classes, children }) => (
  <Card>
    <CardHeader
      className={classes.cardHeader}
      title={title}
      titleTypographyProps={{
        align: 'center'
      }}
    />
    <CardContent>
      {children}
    </CardContent>
  </Card>
)

CardContainerComponent.propTypes = {
  title: string.isRequired,
  classes: parseClasses(styles).isRequired,
  children: node
}

CardContainerComponent.defaultProps = {
  children: null
}

export default withStyles(styles)(CardContainerComponent)
