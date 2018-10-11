import { checkPropTypes } from 'prop-types'
import { parseClasses } from '../../src/util/propTypes'

describe('parseClasses function', () => {
  const style = {
    a: {},
    b: {}
  }
  const classes = {
    a: 'className-a',
    b: 'className-b'
  }
  let realError
  let errors = []

  beforeAll(() => {
    realError = console.error
    console.error = line => errors.push(line)
  })
  afterEach(() => {
    errors = []
  })
  afterAll(() => {
    console.error = realError
  })

  it('returns a prop type that validates classes.', () => {
    checkPropTypes(
      {
        classes: parseClasses(style).isRequired
      },
      {
        classes
      }
    )
    expect(errors.length).toEqual(0)
  })
  it('returns a prop type that does not validate classes of other styles.', () => {
    checkPropTypes(
      {
        classes: parseClasses(style).isRequired
      },
      {
        classes: {
          ...classes,
          b: undefined
        }
      }
    )
    expect(errors.length).toBeGreaterThan(0)
  })
})
