import React, { Component } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'
import { Select, FormControlLabel, Typography, MenuItem } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { changeDelimiter } from '../../util/actions/uploadCredits'
import { parseClasses } from '../../util/propTypes'

const styles = {
  input: {
    marginLeft: '10px'
  }
}

export class DelimiterInputComponent extends Component {
  handleChange = event => {
    const { changeValue } = this.props
    changeValue(event.target.value)
  }

  render() {
    const { value, classes } = this.props
    return (
      <div>
        <FormControlLabel
          label={<Typography>Delimiter: </Typography>}
          labelPlacement="start"
          control={(
            <Select
              name="delimiter"
              value={value}
              onChange={this.handleChange}
              error={value.length > 1}
              className={classes.input}
              displayEmpty
            >
              <MenuItem value="">
                <Typography>automatic</Typography>
              </MenuItem>
              <MenuItem value=",">
                <Typography>comma ( , )</Typography>
              </MenuItem>
              <MenuItem value=";">
                <Typography>semicolon ( ; )</Typography>
              </MenuItem>
              <MenuItem value="#">
                <Typography>pound ( # )</Typography>
              </MenuItem>
            </Select>
          )}
        />
      </div>
    )
  }
}

DelimiterInputComponent.propTypes = {
  value: string.isRequired,
  changeValue: func.isRequired,
  classes: parseClasses(styles).isRequired
}

const mapStateToProps = state => ({
  value: state.uploadCredits.delimiter
})

const mapDispatchToProps = {
  changeValue: changeDelimiter
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(
    DelimiterInputComponent
  )
)
