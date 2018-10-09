import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { connect } from 'react-redux'
import { Table, TableHead, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'
import CreditsPreviewRow from './CreditsPreviewRow'

export const CreditsPreviewComponent = ({ credits, headers }) => (
  <div>
    <Table>
      <TableHead>
        <TableRow>
          {headers.map(field => (
            <TableCell key={field}>
              <Typography>{field}</Typography>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {credits.map(credit => (
          <CreditsPreviewRow
            key={Object.values(credit).reduce((acc, curr) => acc + curr, '')}
            credit={credit}
            headers={headers}
          />
        ))}
      </TableBody>
    </Table>
  </div>
)

CreditsPreviewComponent.propTypes = {
  credits: arrayOf(shape({})).isRequired,
  headers: arrayOf(string).isRequired
}

const mapStateToProps = state => ({
  credits: state.uploadCredits.credits,
  headers: state.uploadCredits.headers
})

export default connect(mapStateToProps, null)(CreditsPreviewComponent)
