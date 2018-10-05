import React from 'react'
import { arrayOf, shape } from 'prop-types'
import { connect } from 'react-redux'
import CreditsPreviewRow from './CreditsPreviewRow'

const CreditsPreview = ({ credits }) => (
  <div>
    {credits.map(credit => (
      <CreditsPreviewRow
        key={Object.values(credit).reduce((acc, curr) => acc + curr, '')}
        credit={credit}
      />
    ))}
  </div>
)

CreditsPreview.propTypes = {
  credits: arrayOf(shape({})).isRequired
}

const mapStateToProps = state => ({
  credits: state.credits.credits
})

export default connect(mapStateToProps, null)(CreditsPreview)
