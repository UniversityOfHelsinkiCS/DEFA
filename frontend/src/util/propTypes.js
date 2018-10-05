import { shape, string, number } from 'prop-types'

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
