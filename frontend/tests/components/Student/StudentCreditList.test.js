import React from 'react'
import { StudentCreditListComponent, noCreditsMessage } from '../../../src/components/Student/StudentCreditList'
import { findText } from '../../testUtils'
import CreditT from '../../../src/components/CreditTable'

StudentCreditListComponent.propTypes = {}

const credits = [
  {
    student_number: '012345678',
    course_name: 'Esimerkkikurssi',
    course_code: 'TKT00000.2018.K.K.1',
    study_credits: 5,
    grade: 5,
    date: '2018-09-25',
    language: 'suomi',
    teacher: 'Teppo Testaaja teppo.testaaja@helsinki.fi',
    university: 'Helsingin yliopisto'
  },
  {
    student_number: '11123456',
    course_name: 'Esimerkkikurssi II',
    course_code: 'TKT00001.2018.K.K.1',
    study_credits: 5,
    grade: 4,
    date: '2018-09-25',
    language: 'suomi',
    teacher: 'Joppe Testaaja joppe.testaaja@jyvaskyla.fi',
    university: 'Jyväskylän yliopisto'
  }
]

describe('StudentCreditList component', () => {
  let wrapper
  describe('when there are no credits', () => {
    beforeAll(() => {
      wrapper = shallow(<StudentCreditListComponent
        classes={{}}
        credits={[]}
      />)
    })

    it('displays a message stating there are no credits.', () => {
      expect(findText(noCreditsMessage, wrapper)).toBeGreaterThan(0)
    })
  })

  describe('when there are some credits', () => {
    beforeAll(() => {
      wrapper = shallow(<StudentCreditListComponent
        classes={{}}
        credits={credits}
      />)
    })

    it('does not display a message stating there are no credits.', () => {
      expect(findText(noCreditsMessage, wrapper)).toEqual(0)
    })
    it('Renders a CreditTable for the credits.', () => {
      const creditTable = wrapper.find(CreditT)
      expect(creditTable.exists()).toEqual(true)
      expect(creditTable.prop('credits')).toEqual(credits)
    })
  })
})
