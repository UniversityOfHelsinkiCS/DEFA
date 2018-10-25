import React from 'react'
import { arrayOf } from 'prop-types'
import { connect } from 'react-redux'
import { Table, TableHead, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'
import CreditsPreviewRow from './CreditsPreviewRow'
import headers from './helpers/creditHeaders'
import { creditProp } from '../../util/propTypes'

export const CreditsPreviewComponent = ({ credits }) => (
  <div>
    <Table>
      <TableHead>
        <TableRow>
          {headers.map(field => (
            <TableCell key={field.key}>
              <Typography>{field.display}</Typography>
            </TableCell>
          ))}
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

CreditsPreviewComponent.propTypes = {
  credits: arrayOf(creditProp).isRequired
}

const mapStateToProps = state => ({
  credits: state.uploadCredits.credits
})

export default connect(mapStateToProps, null)(CreditsPreviewComponent)
