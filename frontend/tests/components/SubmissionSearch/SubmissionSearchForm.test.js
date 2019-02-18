import React from 'react'
import { SubmissionSearchFormComponent } from '../../../src/components/SubmissionSearch/SubmissionSearchForm'
import SubmissionSearchFormTextField from '../../../src/components/SubmissionSearch/SubmissionSearchFormTextField'
import SubmissionSearchQuery from '../../../src/components/SubmissionSearch/SubmissionSearchQuery'

SubmissionSearchFormComponent.propTypes = {}


describe('SubmissionSearchForm component', () => {
  let wrapper

  beforeAll(() => {
    wrapper = shallow(<SubmissionSearchFormComponent
      classes={{}}
    />)
  })

  describe('SubmissionSearchFormTextFields', () => {
    it('are rendered.', () => {
      expect(wrapper.find(SubmissionSearchFormTextField).exists()).toEqual(true)
    })

    it('have unique labels and names.', () => {
      const banned = {
        name: [],
        label: []
      }
      wrapper.find(SubmissionSearchFormTextField).forEach(field => {
        expect(banned.name).not.toContain(field.prop('name'))
        banned.name.push(field.prop('name'))
        expect(banned.label).not.toContain(field.prop('label'))
        banned.label.push(field.prop('label'))
      })
    })
  })

  it('renders a SubmissionSearchQuery.', () => {
    expect(wrapper.find(SubmissionSearchQuery).exists()).toEqual(true)
  })
})
