import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import CreateBlogForm from './CreateBlogForm'

describe('<Blog />', () => {
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
      <Blog blog={blog} user={user} updateLikes={mockUpdateLikesHandler} />,
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

describe('<CreateBlogForm />', () => {
  test('calls the event handler it received as props with the right details when a new blog is created', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

    render(<CreateBlogForm createBlog={createBlog} />)

    const titleInput = screen.getByPlaceholderText('write title here')
    const authorInput = screen.getByPlaceholderText('write author here')
    const urlInput = screen.getByPlaceholderText('write url here')
    const sendButton = screen.getByText('Create')

    await user.type(titleInput, 'testTitle')
    await user.type(authorInput, 'test')
    await user.type(urlInput, 'www.test.com')
    await user.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testTitle')
    expect(createBlog.mock.calls[0][0].author).toBe('test')
    expect(createBlog.mock.calls[0][0].url).toBe('www.test.com')
  })
})
