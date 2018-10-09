import React, { Component } from 'react'
import { func } from 'prop-types'
import { connect } from 'react-redux'
import { FormControlLabel, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { changeFile } from '../../util/actions/credits'
import { parseClasses } from '../../util/propTypes'

const styles = {
  input: {
    marginLeft: '10px'
  }
}

export class FileInputComponent extends Component {
  handleChange = event => {
    const { changeValue } = this.props
    changeValue(event.target.files[0])
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <FormControlLabel
          label={<Typography>Upload .csv file: </Typography>}
          labelPlacement="start"
          control={(
            <input
              type="file"
              name="credits"
              accept=".csv"
              onChange={this.handleChange}
              className={classes.input}
            />
          )}
        />
      </div>
    )
  }
}

FileInputComponent.propTypes = {
  changeValue: func.isRequired,
  classes: parseClasses(styles).isRequired
}

const mapDispatchToProps = {
  changeValue: changeFile
}

export default withStyles(styles)(connect(null, mapDispatchToProps)(FileInputComponent))
