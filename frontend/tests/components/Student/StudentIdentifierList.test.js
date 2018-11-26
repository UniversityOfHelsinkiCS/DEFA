import React from 'react'
import { StudentIdentifierListComponent } from '../../../src/components/Student/StudentIdentifierList'
import { findText } from '../../testUtils'

StudentIdentifierListComponent.propTypes = {}

const identifiers = [
  {
    university: 'uni.fi',
    student_number: '012345678'
  },
  {
    university: 'otheruni.fi',
    student_number: '123456789'
  }
]

describe('StudentIdentifierList component', () => {
  let wrapper
  beforeAll(() => {
    wrapper = mount(<StudentIdentifierListComponent
      identifiers={identifiers}
    />)
  })
  afterAll(() => {
    wrapper.unmount()
  })

  it('displays all identifiers', () => {
    identifiers.forEach(identifier => {
      expect(findText(identifier.university, wrapper)).toBeGreaterThan(0)
      expect(findText(identifier.student_number, wrapper)).toBeGreaterThan(0)
    })
  })
})
