import React from 'react'
import { SubmitCreditsFormComponent } from '../../../src/components/UploadCredits/SubmitCreditsForm'
import DelimiterInput from '../../../src/components/UploadCredits/DelimiterInput'
import FileInput from '../../../src/components/UploadCredits/FileInput'
import CreditsInput from '../../../src/components/UploadCredits/CreditsInput'
import CreditsPreview from '../../../src/components/UploadCredits/CreditsPreview'

SubmitCreditsFormComponent.propTypes = {}

const credits = [
  { totally_a_credit_object: true },
  { totally_a_credit_object: true }
]

describe('SubmitCreditsForm component', () => {
  const dispatchSubmitCredits = jest.fn()
  let wrapper
  beforeEach(() => {
    dispatchSubmitCredits.mockReset()
    wrapper = shallow(<SubmitCreditsFormComponent
      dispatchSubmitCredits={dispatchSubmitCredits}
      credits={credits}
      classes={{}}
    />)
  })

  it('renders a form with all subcomponents as its children.', () => {
    const form = wrapper.find('form')
    expect(form.exists()).toEqual(true)
    expect(form.find(DelimiterInput).exists()).toEqual(true)
    expect(form.find(FileInput).exists()).toEqual(true)
    expect(form.find(CreditsInput).exists()).toEqual(true)
    expect(form.find(CreditsPreview).exists()).toEqual(true)
  })
  it('calls dispatchSubmitCredits prop on submit with credits prop.', () => {
    const event = {
      preventDefault: () => {}
    }
    expect(dispatchSubmitCredits).not.toHaveBeenCalled()
    wrapper.find('form').prop('onSubmit')(event)
    expect(dispatchSubmitCredits).toHaveBeenCalledWith(credits)
  })
})
