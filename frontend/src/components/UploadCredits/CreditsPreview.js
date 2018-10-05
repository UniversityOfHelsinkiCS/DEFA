import React from 'react'
import { arrayOf, shape } from 'prop-types'
import { connect } from 'react-redux'
import { Table, TableHead, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'
import CreditsPreviewRow from './CreditsPreviewRow'

const CreditsPreview = ({ credits }) => (
  <div>
    <Table>
      <TableHead>
        <TableRow>
          {credits.length > 0
            ? Object.keys(credits[0]).map(key => (
              <TableCell key={key}>
                <Typography>{key}</Typography>
              </TableCell>
            ))
            : null}
        </TableRow>
      </TableHead>
      <TableBody>
        {credits.map(credit => (
          <CreditsPreviewRow
            key={Object.values(credit).reduce((acc, curr) => acc + curr, '')}
            credit={credit}
          />
        ))}
      </TableBody>
    </Table>
  </div>
)

CreditsPreview.propTypes = {
  credits: arrayOf(shape({})).isRequired
}

const mapStateToProps = state => ({
  credits: state.credits.credits
})

export default connect(mapStateToProps, null)(CreditsPreview)
