import React from 'react'
import { arrayOf, shape, string } from 'prop-types'
import { List, ListItem, ListItemText, Button } from '@material-ui/core'

export const StudentIdentifierListComponent = ({ identifiers }) => (
  <div>
    <List>
      {identifiers.map(identifier => (
        <ListItem key={identifier.university}>
          <ListItemText
            primary={identifier.university}
            primaryTypographyProps={{
              variant: 'subtitle1'
            }}
            secondary={identifier.student_number}
            secondaryTypographyProps={{
              variant: 'subtitle2'
            }}
          />
        </ListItem>
      ))}
      <ListItem>
        <Button
          type="button"
          variant="outlined"
          disabled
        >
          Link another university account
        </Button>
      </ListItem>
    </List>
  </div>
)

StudentIdentifierListComponent.propTypes = {
  identifiers: arrayOf(
    shape({
      university: string.isRequired,
      student_number: string.isRequired
    })
  ).isRequired
}

export default StudentIdentifierListComponent
