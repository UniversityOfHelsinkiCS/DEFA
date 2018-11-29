import React from 'react'
import { TableCell, TableRow, Typography } from '@material-ui/core'
import { creditProp, headerProp } from '../util/propTypes'

const CreditTableRow = ({ credit, headers }) => (
  <TableRow>
    {headers.map(field => (
      <TableCell key={field.key}>
        <Typography>{String(credit[field.key])}</Typography>
      </TableCell>
    ))}
  </TableRow>
)

CreditTableRow.propTypes = {
  credit: creditProp.isRequired,
  headers: headerProp.isRequired
}

export default CreditTableRow
