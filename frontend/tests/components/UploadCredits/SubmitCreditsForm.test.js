import React from 'react'
import { SubmitCreditsFormComponent } from '../../../src/components/UploadCredits/SubmitCreditsForm'
import DelimiterInput from '../../../src/components/UploadCredits/DelimiterInput'
import FileInput from '../../../src/components/UploadCredits/FileInput'
import CreditsInput from '../../../src/components/UploadCredits/CreditsInput'
import CreditsPreview from '../../../src/components/UploadCredits/CreditsPreview'

SubmitCreditsFormComponent.propTypes = {}

describe('SubmitCreditsForm component', () => {
  const onSubmit = jest.fn()
  let wrapper
  beforeEach(() => {
    onSubmit.mockReset()
    wrapper = shallow(<SubmitCreditsFormComponent
      onSubmit={onSubmit}
      ready
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
  it('calls onSubmit prop on submit.', () => {
    const event = {
      preventDefault: () => {}
    }
    expect(onSubmit).not.toHaveBeenCalled()
    wrapper.find('form').prop('onSubmit')(event)
    expect(onSubmit).toHaveBeenCalled()
  })
})
