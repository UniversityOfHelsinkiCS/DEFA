import { shape, string, number } from 'prop-types'

// eslint-disable-next-line import/prefer-default-export
export const file = shape({
  name: string.isRequired,
  lastModified: number.isRequired,
  webkitRelativePath: string.isRequired,
  size: number.isRequired,
  type: string.isRequired
})
