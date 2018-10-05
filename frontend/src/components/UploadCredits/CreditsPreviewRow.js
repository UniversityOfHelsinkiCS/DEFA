import React from 'react'
import { shape } from 'prop-types'

const CreditsPreview = ({ credit }) => (
  <div>
    {Object.keys(credit).map(key => (
      <div key={key}>
        <span>{key}</span>
        <span>: </span>
        <span>{credit[key]}</span>
      </div>
    ))}
    <br />
  </div>
)

CreditsPreview.propTypes = {
  credit: shape({}).isRequired
}

export default CreditsPreview
