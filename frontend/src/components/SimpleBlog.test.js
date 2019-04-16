import React from 'react'
import 'jest-dom/extend-expect'
import { render, cleanup } from 'react-testing-library'
import { prettyDOM } from 'dom-testing-library'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders content', () => {
  const blog = {
    title: 'Test title',
    author: 'Test Author',
    likes: 8
  }
  const mockHandler = jest.fn()

  const component = render(<SimpleBlog blog={blog} onClick={mockHandler} />)
  expect(component.container).toHaveTextContent('Test title')
  expect(component.container).toHaveTextContent('Test Author')
  expect(component.container).toHaveTextContent('8 likes')
})