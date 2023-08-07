import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  beforeEach(() => {
    const user = {
      username: 'test',
      name: 'test',
      password: 'test',
    }

    const blog = {
      user: user,
      likes: 15,
      author: 'John',
      title: 'I like cheese!',
      url: 'www.cheeselikers.com',
    }

    render(<Blog blog={blog} user={user} />)
  })

  test('renders the title and author of the blog, but does not render url and number of likes by default', async () => {
    const titleAndAuthor = await screen.getByText('I like cheese! John')
    const url = screen.queryByText('www.cheeselikers.com')
    const likes = screen.queryByText('likes 15')

    expect(titleAndAuthor).toBeDefined()
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders url and number of likes after button for showing more details is clicked', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText('www.cheeselikers.com')
    const likes = screen.getByText('likes 15')

    expect(url).toBeDefined()
    expect(likes).toBeDefined()
  })
})
