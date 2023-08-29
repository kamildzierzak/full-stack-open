import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
  },
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
    dispatch(initializeBlogs())
  }
}

export const like = (id) => {
  return async (dispatch) => {
    const blogToLike = await blogService.getOne(id)
    const changedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    }
    await blogService.update(id, changedBlog)
    dispatch(initializeBlogs())
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.deleteOne(id)
    dispatch(initializeBlogs())
    dispatch(
      setNotification(
        {
          text: `Blog ${id} has been deleted`,
          type: 'success',
        },
        5,
      ),
    )
  }
}

export const createComment = (id, comment) => {
  return async (dispatch) => {
    await blogService.addComment(id, comment)
    dispatch(initializeBlogs())
  }
}

export default blogSlice.reducer
