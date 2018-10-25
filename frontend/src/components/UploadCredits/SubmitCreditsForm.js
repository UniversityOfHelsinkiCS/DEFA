import React, { Component } from 'react'
import { bool, func } from 'prop-types'
import { Button, Typography, FormGroup } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import DelimiterInput from './DelimiterInput'
import FileInput from './FileInput'
import CreditsInput from './CreditsInput'
import CreditsPreview from './CreditsPreview'
import { parseClasses } from '../../util/propTypes'

const styles = {
  form: {
    margin: '0% 5% 0% 5%'
  },
  segment: {
    padding: '10px 0px 10px 0px'
  },
  group: {
    marginTop: '10px'
  },
  button: {
    marginLeft: '20px',
    marginRight: '20px'
  }
}

export class SubmitCreditsFormComponent extends Component {
  handleSubmit = event => {
    const { onSubmit } = this.props
    event.preventDefault()
    onSubmit(event)
  }

  render() {
    const { ready, classes } = this.props
    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <div className={classes.segment}>
          <div className={classes.group}>
            <FileInput />
            <DelimiterInput />
          </div>
          <FormGroup row className={classes.group}>
            <CreditsInput className={classes.button} />
            <Button
              type="submit"
              disabled={!ready}
              color="primary"
              variant="contained"
              className={classes.button}
            >
              <Typography>Submit</Typography>
            </Button>
          </FormGroup>
        </div>
        <div className={classes.segment}>
          <CreditsPreview />
        </div>
      </form>
    )
  }
}

SubmitCreditsFormComponent.propTypes = {
  classes: parseClasses(styles).isRequired,
  onSubmit: func.isRequired,
  ready: bool.isRequired
}

export default withStyles(styles)(SubmitCreditsFormComponent)
