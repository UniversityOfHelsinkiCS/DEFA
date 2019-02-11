import { shape, string, number, arrayOf } from 'prop-types'

export const file = shape({
  name: string.isRequired,
  lastModified: number.isRequired,
  webkitRelativePath: string.isRequired,
  size: number.isRequired,
  type: string.isRequired
})

export const parseClasses = styles => {
  if (typeof styles === 'function') {
    console.warn(
      'parseClasses function should only be used for style definition objects, not functions. Received function as input: no prop type validation is performed.'
    )
  }
  return shape(
    Object.keys(styles).reduce(
      (acc, key) => ({
        ...acc,
        [key]: string.isRequired
      }),
      {}
    )
  )
}

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
  id: string.isRequired,
  name: string,
  role: string
})

export const headerProp = arrayOf(
  shape({
    key: string.isRequired,
    display: string.isRequired
  })
)
