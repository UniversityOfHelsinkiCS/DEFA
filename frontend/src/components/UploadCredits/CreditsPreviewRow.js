import React from 'react'
import { TableCell, TableRow, Typography } from '@material-ui/core'
import headers from './helpers/creditHeaders'
import { creditProp } from '../../util/propTypes'

const CreditsPreview = ({ credit }) => (
  <TableRow>
    {headers.map(field => (
      <TableCell key={field.key}>
        <Typography>{String(credit[field.key])}</Typography>
      </TableCell>
    ))}
  </TableRow>
)

CreditsPreview.propTypes = {
  credit: creditProp.isRequired
}

export default CreditsPreview
