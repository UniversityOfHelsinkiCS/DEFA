import React from 'react'
import { StudentInformationComponent } from '../../../src/components/Student/StudentInformation'
import { findText } from '../../testUtils'

StudentInformationComponent.propTypes = {}

const user = {
  id: '11111111111111111111',
  name: 'Name Nameson',
  role: 'STUDENT',
  email: 'name@mail.test'
}

describe('StudentInformation component', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<StudentInformationComponent
      user={user}
      translate={id => id}
    />)
  })
  afterAll(() => {
    wrapper.unmount()
  })

  it('Displays user\'s name', () => {
    expect(findText(user.name, wrapper)).toBeGreaterThan(0)
  })
  it('Displays user\'s email', () => {
    expect(findText(user.email, wrapper)).toBeGreaterThan(0)
  })
})
