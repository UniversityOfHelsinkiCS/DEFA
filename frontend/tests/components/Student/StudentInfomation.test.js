import React from 'react'
import { StudentInformationComponent } from '../../../src/components/Student/StudentInformation'
import { findText } from '../../testUtils'

StudentInformationComponent.propTypes = {}

const user = {
  id: '11111111111111111111',
  name: 'Name Nameson',
  role: 'STUDENT',
  attributes: {
    cn: 'Name Nameson',
    displayName: 'Name',
    eduPersonPrincipalName: '????',
    mail: 'name@email.com',
    schacHomeOrganization: 'uni.fi',
    schacPersonalUniqueCode: '012345678'
  }
}

describe('StudentInformation component', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<StudentInformationComponent
      user={user}
    />)
  })
  afterAll(() => {
    wrapper.unmount()
  })

  it('Displays user\'s name', () => {
    expect(findText(user.attributes.cn, wrapper)).toBeGreaterThan(0)
  })
  it('Displays user\'s email address', () => {
    expect(findText(user.attributes.mail, wrapper)).toBeGreaterThan(0)
  })
})
