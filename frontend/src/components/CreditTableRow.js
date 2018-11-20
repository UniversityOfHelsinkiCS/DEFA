import React from 'react'
import { TableCell, TableRow, Typography } from '@material-ui/core'
import { creditProp, headerProp } from '../util/propTypes'

const CreditsPreview = ({ credit, headers }) => (
  <TableRow>
    {console.log(credit, headers)}
    {headers.map(field => (
      <TableCell key={field.key}>
        <Typography>{String(credit[field.key])}</Typography>
      </TableCell>
    ))}
  </TableRow>
)

CreditsPreview.propTypes = {
  credit: creditProp.isRequired,
  headers: headerProp.isRequired
}

export default CreditsPreview
