import React, { Component } from 'react'
import { func, arrayOf, shape } from 'prop-types'
import { connect } from 'react-redux'
import { submitCredits } from '../../util/actions/credits'
import DelimiterInput from './DelimiterInput'
import FileInput from './FileInput'
import CreditsInput from './CreditsInput'
import CreditsPreview from './CreditsPreview'

class SubmitCreditsForm extends Component {
  handleSubmit = event => {
    const { dispatchSubmitCredits, credits } = this.props
    event.preventDefault()
    dispatchSubmitCredits(credits)
  }

  render() {
    const { credits } = this.props
    return (
      <form onSubmit={this.handleSubmit}>
        <DelimiterInput />
        <FileInput />
        <CreditsInput />
        <CreditsPreview />
        <button type="submit" disabled={credits.length === 0}>Submit</button>
      </form>
    )
  }
}

SubmitCreditsForm.propTypes = {
  dispatchSubmitCredits: func.isRequired,
  credits: arrayOf(shape({})).isRequired
}

const mapStateToProps = state => ({
  credits: state.credits.credits
})

const mapDispatchToProps = {
  dispatchSubmitCredits: submitCredits
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitCreditsForm)
