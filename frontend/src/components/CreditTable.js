import React from 'react'
import { arrayOf } from 'prop-types'
import { Table, TableHead, TableBody, TableCell, TableRow, Typography } from '@material-ui/core'
import CreditsPreviewRow from './CreditTableRow'
import { creditProp } from '../util/propTypes'

const headers = [
  {
    key: 'student_number',
    display: 'student number'
  },
  {
    key: 'course_name',
    display: 'course name'
  },
  {
    key: 'course_code',
    display: 'course code'
  },
  {
    key: 'date',
    display: 'date'
  },
  {
    key: 'study_credits',
    display: 'credits'
  },
  {
    key: 'grade',
    display: 'grade'
  },
  {
    key: 'language',
    display: 'language'
  },
  {
    key: 'university',
    display: 'university'
  },
  {
    key: 'teacher',
    display: 'teacher'
  }
]


export const CreditTable = ({ credits }) => (
  <div>
    {console.log(credits)}
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
            headers={headers}
          />
        ))}
      </TableBody>
    </Table>
  </div>
)

CreditTable.propTypes = {
  credits: arrayOf(creditProp).isRequired
}


export default CreditTable
