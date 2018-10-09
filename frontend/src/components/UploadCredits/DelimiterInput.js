import React, { Component } from 'react'
import { string, func } from 'prop-types'
import { connect } from 'react-redux'
import { Input, FormControlLabel, Typography } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { changeDelimiter } from '../../util/actions/credits'
import { parseClasses } from '../../util/propTypes'

const styles = {
  input: {
    width: '35px',
    marginLeft: '5px'
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
            <Input
              type="text"
              name="delimiter"
              value={value}
              onChange={this.handleChange}
              error={value.length > 1}
              className={classes.input}
            />
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
