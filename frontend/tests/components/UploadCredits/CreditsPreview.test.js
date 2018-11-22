import React from 'react'
import { CreditsPreviewComponent } from '../../../src/components/UploadCredits/CreditsPreview'
import CreditT from '../../../src/components/CreditTable'

CreditsPreviewComponent.propTypes = {}

const university = 'uni.fi'
const teacher = 'aaaaaaaaaaaaaaaa'

const user = {
  id: teacher,
  attributes: {
    schacHomeOrganization: university
  }
}

const credits = [{}, {}]

describe('CreditsPreview component', () => {
  let wrapper
  beforeAll(() => {
    wrapper = shallow(<CreditsPreviewComponent
      user={user}
      credits={credits}
    />)
  })

  it('renders a CreditTable with user information auto-filled.', () => {
    const tableCredits = wrapper.find(CreditT).prop('credits')
    expect(tableCredits).toEqual([
      {
        university,
        teacher
      },
      {
        university,
        teacher
      }
    ])
  })
})
