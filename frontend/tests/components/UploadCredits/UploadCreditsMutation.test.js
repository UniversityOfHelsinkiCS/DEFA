import React from 'react'
import { UploadCreditsMutationComponent } from '../../../src/components/UploadCredits/UploadCreditsMutation'
import { createCredits } from '../../../src/util/queries/uploadCredits'

const credits = [{ totally_a_credit: true }, { totally_a_credit: 'maybe' }]
const TestForm = () => <form />

describe('UploadCreditsMutation component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<UploadCreditsMutationComponent
      UploadForm={TestForm}
      credits={credits}
    />)
  })

  describe('mutation', () => {
    let mutation
    beforeEach(() => {
      mutation = wrapper.find('[mutation]')
    })

    it('uses the createCredits query.', () => {
      expect(mutation.prop('mutation')).toEqual(createCredits)
    })
    it('sets credits in variables.', () => {
      expect(mutation.prop('variables')).toMatchObject({ credits })
    })
  })
})
