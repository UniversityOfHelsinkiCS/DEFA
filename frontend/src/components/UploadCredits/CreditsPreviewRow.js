import React from 'react'
import { shape } from 'prop-types'
import { TableCell, TableRow, Typography } from '@material-ui/core'

const CreditsPreview = ({ credit }) => (
  <TableRow>
    {Object.keys(credit).map(key => (
      <TableCell key={key}>
        <Typography>{credit[key]}</Typography>
      </TableCell>
    ))}
  </TableRow>
)

CreditsPreview.propTypes = {
  credit: shape({}).isRequired
}

export default CreditsPreview
