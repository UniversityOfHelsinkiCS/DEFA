import React from 'react'
import { func, arrayOf } from 'prop-types'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import { createCredits } from '../../util/queries/uploadCredits'
import { creditProp } from '../../util/propTypes'
import { mutationOnError, mutationOnCompleted } from '../../util/actions/uploadCredits'

export const UploadCreditsMutationComponent = ({ UploadForm, credits, onError, onCompleted }) => (
  <Mutation
    mutation={createCredits}
    variables={{ credits }}
    onError={onError}
    onCompleted={onCompleted}
  >
    {mutate => (
      <UploadForm onSubmit={mutate} ready={credits.length !== 0} />
    )}
  </Mutation>
)

UploadCreditsMutationComponent.propTypes = {
  UploadForm: func.isRequired,
  credits: arrayOf(creditProp).isRequired,
  onError: func.isRequired,
  onCompleted: func.isRequired
}

const mapStateToProps = state => ({
  credits: state.uploadCredits.credits
})

const mapDispatchToProps = {
  onError: mutationOnError,
  onCompleted: mutationOnCompleted
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadCreditsMutationComponent)
