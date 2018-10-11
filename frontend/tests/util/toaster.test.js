import * as toastify from 'react-toastify'
import toaster from '../../src/util/toaster'

describe('toaster', () => {
  let next
  let realToast

  beforeAll(() => {
    realToast = toastify.toast
  })
  beforeEach(() => {
    toastify.toast = jest.fn()
    next = jest.fn()
  })
  afterAll(() => {
    toastify.toast = realToast
  })

  describe('when action includes a toast field', () => {
    const action = {
      type: 'TEST',
      toast: {
        message: 'testing',
        options: {
          autoClose: 4000
        }
      }
    }
    it('calls next with action.', () => {
      toaster()(next)(action)
      expect(next).toHaveBeenCalledWith(action)
    })
    it('calls toast with message and options.', () => {
      toaster()(next)(action)
      expect(toastify.toast).toHaveBeenCalledWith(action.toast.message, action.toast.options)
    })
  })

  describe('when action does not include a toast field', () => {
    const action = {
      type: 'TEST'
    }
    it('calls next with action.', () => {
      toaster()(next)(action)
      expect(next).toHaveBeenCalledWith(action)
    })
    it('does not call toast.', () => {
      toaster()(next)(action)
      expect(toastify.toast).not.toHaveBeenCalled()
    })
  })
})
