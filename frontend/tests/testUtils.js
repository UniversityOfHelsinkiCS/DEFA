// eslint-disable-next-line import/prefer-default-export
export const findText = (text, wrapper) => {
  let found = 0
  if (wrapper.text().includes(text)) found += 1
  wrapper.children().forEach(child => {
    found += findText(text, child)
  })
  return found
}

/**
 * @param { (input: any) => (dispatch: function) => undefined } action
 * @param { { input: any, expectation: { type: string, [key: string]: any } } } options
 */
export const testAction = (action, options) => {
  describe(`${action.name} action`, () => {
    it('dispatches correct action when called.', () => {
      const dispatch = jest.fn()
      action(options.input)(dispatch)
      expect(dispatch).toHaveBeenCalledWith(options.expectation)
    })
  })
}

/**
 * @param { (input: any) => (dispatch: function) => undefined } action
 * @param {any} input
 */
export const testApiConnectionAction = (action, input) => {
  describe(`${action.name} action`, () => {
    it('dispatches a compliant action when called.', () => {
      const dispatch = jest.fn()
      action(input)(dispatch)
      const args = dispatch.mock.calls[0][0].requestSettings
      expect(dispatch).toHaveBeenCalledWith({
        type: `${args.prefix}_ATTEMPT`,
        requestSettings: expect.objectContaining({
          route: expect.any(String),
          prefix: expect.stringMatching(/^([A-Z]|_)+$/),
          data: ['post', 'put'].includes(args.method) ? expect.anything() : undefined,
          method: expect.stringMatching(/^(get|post|delete|put)$/)
        })
      })
    })
  })
}
