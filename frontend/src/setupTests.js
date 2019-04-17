import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

let savedBlogs = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedBlogs[key] = item
  },
  getItem: (key) => savedBlogs[key],
  clear: savedBlogs = {}
}

window.localStorage = localStorageMock