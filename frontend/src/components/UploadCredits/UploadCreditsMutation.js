import React from 'react'
import { func, arrayOf, shape } from 'prop-types'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import { createCredits } from '../../util/queries/uploadCredits'

export const UploadCreditsMutationComponent = ({ UploadForm, credits }) => (
  <Mutation mutation={createCredits} variables={{ credits }}>
    {mutate => (
      <UploadForm onSubmit={mutate} ready={credits.length !== 0} />
    )}
  </Mutation>
)

UploadCreditsMutationComponent.propTypes = {
  UploadForm: func.isRequired,
  credits: arrayOf(shape({})).isRequired
}

const mapStateToProps = state => ({
  credits: state.uploadCredits.credits
})

export default connect(mapStateToProps, null)(UploadCreditsMutationComponent)
