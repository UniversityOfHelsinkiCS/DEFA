import Enzyme, { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

// make Enzyme functions available in all test files without importing
global.shallow = Enzyme.shallow

// this is where we reference the adapter package we installed
// earlier

// This sets up the adapter to be used by Enzyme
Enzyme.configure({ adapter: new Adapter() })

const localStorageMock = () => {
  let store = {}
  return {
    getItem: key => store[key],
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    clear: () => {
      store = {}
    },
    removeItem: key => delete store[key]
  }
}
Object.defineProperty(window, 'localStorage', { value: localStorageMock() })
