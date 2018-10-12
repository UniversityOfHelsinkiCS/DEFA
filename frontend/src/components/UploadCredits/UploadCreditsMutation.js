import React from 'react'
import { func, arrayOf } from 'prop-types'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import { createCredits } from '../../util/queries/uploadCredits'
import { creditProp } from '../../util/propTypes'

export const UploadCreditsMutationComponent = ({ UploadForm, credits }) => (
  <Mutation mutation={createCredits} variables={{ credits }}>
    {mutate => (
      <UploadForm onSubmit={mutate} ready={credits.length !== 0} />
    )}
  </Mutation>
)

UploadCreditsMutationComponent.propTypes = {
  UploadForm: func.isRequired,
  credits: arrayOf(creditProp).isRequired
}

const mapStateToProps = state => ({
  credits: state.uploadCredits.credits
})

export default connect(mapStateToProps, null)(UploadCreditsMutationComponent)
