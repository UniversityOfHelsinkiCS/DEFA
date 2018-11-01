import React from 'react'
import { func, arrayOf } from 'prop-types'
import { connect } from 'react-redux'
import { Mutation } from 'react-apollo'
import { createCredits } from '../../util/queries/uploadCredits'
import { creditProp } from '../../util/propTypes'
import { mutationOnCompleted } from '../../util/actions/uploadCredits'

export const UploadCreditsMutationComponent = ({ UploadForm, credits, onCompleted }) => (
  <Mutation
    mutation={createCredits}
    variables={{ credits }}
    onError={() => undefined}
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
  onCompleted: func.isRequired
}

const mapStateToProps = state => ({
  credits: state.uploadCredits.credits
})

const mapDispatchToProps = {
  onCompleted: mutationOnCompleted
}

export default connect(mapStateToProps, mapDispatchToProps)(UploadCreditsMutationComponent)
