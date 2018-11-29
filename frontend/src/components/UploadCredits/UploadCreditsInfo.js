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
  },
  listNumber: {
    fontWeight: 'bold',
    marginRight: '5px'
  }
}

const instructionsBlock = `
Credits must be uploaded through this form as a csv (comma separated values) file. Download a blank template by clicking on the download lin on this page.
The template file can be opened with any spreadsheet editing program (e.g. Microsoft Excel). Each row after the header row is a course completion.
Fill in the corresponding values for each column for as many course completions as you wish to upload into the service. The header row should be included in the uploaded file.
Fields not included in the template file should not be provided. Instead, these fields will be autofilled with your information.
If you already have a csv file with the relevant data you should copy the headers from the template file into the top of the corresponding columns.
You may change the order of the columns without issue.
`

const instructionsSteps = [
  'When you\'ve created a valid csv file, upload it with the form below.',
  'Choose the delimiter you used in your csv file. Automatic handling is suggested. Only change the delimiter if the automatic handling fails.',
  'Once you\'ve uploaded a file, the PARSE button lights up. Click or tap it to display a preview of the course completions to upload.',
  'Inspect the preview for any possible errors.',
  'Finally click or tap the SUBMIT button to upload the course completions to the service.',
  'Optionally verify the uploads were successful on the My Uploads page.'
]

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
                  <Typography variant="h5">Instructions</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    {instructionsBlock}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5">Steps of uploading</Typography>
                </Grid>
                <Grid item xs={12}>
                  <List dense>
                    {instructionsSteps.map((step, index) => (
                      <ListItem>
                        <Typography className={classes.listNumber}>{`${index + 1}. `}</Typography>
                        <Typography>{step}</Typography>
                      </ListItem>
                    ))}
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
