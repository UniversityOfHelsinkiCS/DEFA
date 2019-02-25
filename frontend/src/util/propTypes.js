import { shape, string, arrayOf } from 'prop-types'

const propType = validator => {
  const withIsRequired = (
    props,
    propName,
    componentName
  ) => validator(props, propName, componentName)
  withIsRequired.isRequired = (props, propName, componentName) => {
    if (props[propName] === undefined || props[propName] === null) {
      return new Error(
        `'Invalid prop ${propName} supplied to ${componentName}. Prop is required.`
      )
    }
    return validator(props, propName, componentName)
  }
  return withIsRequired
}

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

const role = propType((props, propName, componentName) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (!/^(STUDENT|PRIVILEGED|ADMIN)$/.test(props[propName])) {
    return new Error(
      `'Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
    )
  }
  return null
})

export const hexadecimal = propType((props, propName, componentName) => {
  // eslint-disable-next-line react/destructuring-assignment
  if (!/^[0-9a-f]+$/.test(props[propName])) {
    return new Error(
      `'Invalid prop ${propName} supplied to ${componentName}. Validation failed.`
    )
  }
  return null
})

export const userProp = shape({
  id: hexadecimal.isRequired,
  name: string,
  role: role.isRequired
})

export const headerProp = arrayOf(
  shape({
    key: string.isRequired,
    display: string.isRequired
  })
)
