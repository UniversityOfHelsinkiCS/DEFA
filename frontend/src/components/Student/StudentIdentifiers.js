import React from 'react'
import { Query } from 'react-apollo'
import { Card, CardHeader, List, ListItem, ListItemText } from '@material-ui/core'
import { getMyIdentifiers } from '../../util/queries/getIdentifiers'

const StudentIdentifiersComponent = () => (
  <div>
    <Card>
      <CardHeader
        title="Universities"
        titleTypographyProps={{
          align: 'center'
        }}
      />
      <Query query={getMyIdentifiers}>
        {({ loading, error, data }) => {
          if (loading) { return 'loading...' }
          if (error || !data.me) { return 'AAAAAA' }
          const { identifiers } = data.me
          return (
            <List>
              {identifiers.map(identifier => (
                <ListItem>
                  <ListItemText
                    primary={identifier.university}
                    secondary={identifier.student_number}
                  />
                </ListItem>
              ))}
            </List>
          )
        }}
      </Query>
    </Card>
  </div>
)

export default StudentIdentifiersComponent
