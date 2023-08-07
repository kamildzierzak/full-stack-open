import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog/>', () => {
  let mockUpdateLikesHandler

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

    mockUpdateLikesHandler = jest.fn()

    render(
      <Blog blog={blog} user={user} updateLikes={mockUpdateLikesHandler} />
    )
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

  test('like button is clicked twice, the event handler received by the component as props is called twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)

    const likeButton = screen.getByText('like')
    await user.dblClick(likeButton)

    expect(mockUpdateLikesHandler.mock.calls).toHaveLength(2)
  })
})
