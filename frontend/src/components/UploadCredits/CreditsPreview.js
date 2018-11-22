import React from 'react'
import { arrayOf } from 'prop-types'
import { connect } from 'react-redux'
import { creditProp, userProp } from '../../util/propTypes'
import CreditT from '../CreditTable'

export const CreditsPreviewComponent = ({ user, credits }) => {
  const tableCredits = credits.map(credit => ({
    ...credit,
    university: user.attributes.schacHomeOrganization,
    teacher: user.id
  }))
  return (
    <div>
      <CreditT credits={tableCredits} />
    </div>
  )
}

CreditsPreviewComponent.propTypes = {
  user: userProp.isRequired,
  credits: arrayOf(creditProp).isRequired
}

const mapStateToProps = state => ({
  user: state.user.user,
  credits: state.uploadCredits.credits
})

export default connect(mapStateToProps, null)(CreditsPreviewComponent)
