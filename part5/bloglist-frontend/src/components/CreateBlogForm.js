import { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = event => {
    event.preventDefault()
    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            value={title}
            name="Title"
            placeholder="write title here"
            onChange={({ target }) => setTitle(target.value)}
          ></input>
        </div>
        <div>
          Author:
          <input
            id="author"
            type="text"
            value={author}
            name="Author"
            placeholder="write author here"
            onChange={({ target }) => setAuthor(target.value)}
          ></input>
        </div>
        <div>
          URL:
          <input
            id="url"
            type="text"
            value={url}
            name="Url"
            placeholder="write url here"
            onChange={({ target }) => setUrl(target.value)}
          ></input>
        </div>
        <button id="create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateBlogForm
