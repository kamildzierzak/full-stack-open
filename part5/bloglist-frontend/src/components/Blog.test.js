import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('blog renders blog title and author, but does not render url and number of likes by default', async () => {
  const blog = {
    user: 1,
    likes: 15,
    author: 'John',
    title: 'I like cheese!',
    url: 'www.cheeselikers.com',
  }

  render(<Blog blog={blog} />)

  const titleAndAuthor = await screen.findByText('I like cheese! John')
  const url = screen.queryByText('www.cheeselikers.com')
  const likes = screen.queryByText(15)

  expect(titleAndAuthor).toBeDefined()
  expect(url).toBeNull()
  expect(likes).toBeNull()
})
