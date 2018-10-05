import React from 'react'
import { shape, arrayOf, string } from 'prop-types'
import { TableCell, TableRow, Typography } from '@material-ui/core'

const CreditsPreview = ({ credit, headers }) => (
  <TableRow>
    {headers.map(field => (
      <TableCell key={field}>
        <Typography>{credit[field]}</Typography>
      </TableCell>
    ))}
  </TableRow>
)

CreditsPreview.propTypes = {
  credit: shape({}).isRequired,
  headers: arrayOf(string).isRequired
}

export default CreditsPreview
