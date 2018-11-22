import React from 'react'
import { List, ListItem, ListItemText, Card, CardContent, CardHeader } from '@material-ui/core'
import { Query } from 'react-apollo'
import { getMyCredits } from '../../util/queries/getCredits'

const StudentCreditsComponent = () => (
  <div>
    <Card>
      <CardHeader
        title="DEFA Credits"
        titleTypographyProps={{
          align: 'center'
        }}
      />
      <CardContent>
        <Query query={getMyCredits}>
          {({ loading, error, data }) => {
            if (loading) { return 'loading...' }
            if (error || !data.me) { return 'Failed to fetch credits data.' }
            if (!data.me.identifiers) { return 'You have no credits.' }
            const credits = data.me.identifiers.reduce(
              (acc, curr) => (curr.credits ? [...acc, ...curr.credits] : acc),
              []
            )
            return (
              <List>
                {credits.map(credit => (
                  <ListItem>
                    <ListItemText
                      primary={credit.course_name}
                      secondary={(
                        <List>
                          <ListItem>
                            <ListItemText
                              primary="course code"
                              secondary={credit.course_code}
                            />
                            <ListItemText
                              primary="date"
                              secondary={credit.date}
                            />
                            <ListItemText
                              primary="credits"
                              secondary={credit.study_credits}
                            />
                            <ListItemText
                              primary="grade"
                              secondary={credit.grade}
                            />
                            <ListItemText
                              primary="language"
                              secondary={credit.language}
                            />
                            <ListItemText
                              primary="teacher"
                              secondary={`${credit.teacher.name} ${credit.teacher.email}`}
                            />
                          </ListItem>
                        </List>
                      )}
                    />
                  </ListItem>
                ))}
              </List>
            )
          }}
        </Query>
      </CardContent>
    </Card>
  </div>
)

export default StudentCreditsComponent
