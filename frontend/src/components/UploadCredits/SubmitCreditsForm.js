import React, { Component } from 'react'
import { func, arrayOf, shape } from 'prop-types'
import { connect } from 'react-redux'
import { Button, Typography, FormGroup } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { submitCredits } from '../../util/actions/credits'
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
    const { dispatchSubmitCredits, credits } = this.props
    event.preventDefault()
    dispatchSubmitCredits(credits)
  }

  render() {
    const { credits, classes } = this.props
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
              disabled={credits.length === 0}
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
  dispatchSubmitCredits: func.isRequired,
  credits: arrayOf(shape({})).isRequired,
  classes: parseClasses(styles).isRequired
}

const mapStateToProps = state => ({
  credits: state.uploadCredits.credits
})

const mapDispatchToProps = {
  dispatchSubmitCredits: submitCredits
}

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(
    SubmitCreditsFormComponent
  )
)
