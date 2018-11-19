import { shape, string, number, arrayOf } from 'prop-types'

export const file = shape({
  name: string.isRequired,
  lastModified: number.isRequired,
  webkitRelativePath: string.isRequired,
  size: number.isRequired,
  type: string.isRequired
})

export const parseClasses = styles => shape(
  Object.keys(styles).reduce(
    (acc, key) => ({
      ...acc,
      [key]: string.isRequired
    }),
    {}
  )
)

export const creditProp = shape({
  student_number: string,
  course_code: string,
  date: string,
  study_credits: number,
  grade: number,
  language: string,
  teacher: string,
  university: string
})

export const userProp = shape({
  id: string,
  name: string,
  role: string,
  attributes: shape({
    cn: string.isRequired,
    displayName: string.isRequired,
    eduPersonPrincipalName: string.isRequired,
    mail: string.isRequired,
    schacHomeOrganization: string.isRequired,
    schacPersonalUniqueCode: string.isRequired
  }).isRequired
})

export const headerProp = arrayOf(
  shape({
    key: string.isRequired,
    display: string.isRequired
  })
)
