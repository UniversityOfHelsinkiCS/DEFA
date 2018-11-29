import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Typography, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem, Grid } from '@material-ui/core'
import { secondary } from '../../common/colors'
import { parseClasses } from '../../util/propTypes'

const styles = {
  panel: {
    margin: '1% 5% 0% 5%'
  },
  panelSummary: {
    backgroundColor: secondary.light
  }
}

class UploadCreditsInfoComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }
    this.panelRef = React.createRef()
  }

  toggleExpand = () => {
    const { expanded } = this.state
    this.setState({
      expanded: !expanded
    })
  }

  fullyCollapsed = () => {
    if (!this.panelRef.current || !this.panelRef.current.clientHeight) {
      return true
    }
    console.log(this.panelRef.current.clientHeight)
    return this.panelRef.current.clientHeight < 50
  }

  render() {
    const { expanded } = this.state
    const { classes } = this.props
    return (
      <div>
        <div
          className={classes.panel}
          style={{
            width: expanded ? undefined : '180px'
          }}
        >
          <ExpansionPanel
            expanded={expanded}
            onChange={this.toggleExpand}
            CollapseProps={{
              timeout: expanded ? undefined : 0
            }}
          >
            <ExpansionPanelSummary className={classes.panelSummary}>
              <Typography>How to Use</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <Typography>
                    {`
                      Credits must be uploaded through this form as a csv (comma separated values) file. Download a blank template by clicking on the download lin on this page.
                      The template file can be opened with any spreadsheet editing program (e.g. Microsoft Excel). Each row after the header row is a course completion.
                      Fill in the corresponding values for each column for as many course completions as you wish to upload into the service. The header row should be included in the uploaded file.
                      Fields not included in the template file should not be provided. Instead, these fields will be autofilled with your information.
                      If you already have a csv file with the relevant data you should copy the headers from the template file. You may change the order of the columns without issue.
                    `}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <List>
                    <ListItem>
                      <Typography>
                        {'1. When you\'ve created a valid csv file upload it with the form below.'}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        {'2. Choose the delimiter you used in your csv file. Leave it blank for automatic handling. Only change the delimiter if the automatic handling fails.'}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>{'3. Once you\'ve uploaded a file the PARSE button lights up. Click or tap it to display a preview of the course completions to upload.'}</Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        {'4. Inspect the preview for any possible errors.'}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        {'5. Finally click or tap the SUBMIT button to upload the course completions to the service.'}
                      </Typography>
                    </ListItem>
                    <ListItem>
                      <Typography>
                        {'6. Optionally verify the uploads were successful on the My Uploads page.'}
                      </Typography>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    )
  }
}

UploadCreditsInfoComponent.propTypes = {
  classes: parseClasses(styles).isRequired
}

export default withStyles(styles)(UploadCreditsInfoComponent)
