let _ = require('lodash')

const dummy = blogs => {
  if (blogs) {
    return 1
  } else {
    return 1
  }
}

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0
  } else if (blogs.length === 1) {
    return blogs[0].likes
  } else {
    return blogs.reduce((accumulator, currentBlog) => {
      return accumulator + currentBlog.likes
    }, 0)
  }
}

const favoriteBlog = blogs => {
  if (blogs.length === 0) {
    return null
  } else if (blogs.length === 1) {
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes,
    }
  } else {
    let iMax = 0
    let vMax = 0
    for (let i = 0; i < blogs.length; i++) {
      if (blogs[i].likes > vMax) {
        iMax = i
        vMax = blogs[i].likes
      }
    }

    return {
      title: blogs[iMax].title,
      author: blogs[iMax].author,
      likes: vMax,
    }
  }
}

const mostBlogs = blogs => {
  if (blogs.length === 0) {
    return null
  } else if (blogs.length === 1) {
    return {
      author: blogs[0].author,
      blogs: 1,
    }
  } else {
    const authorsBlogsCount = _(blogs)
      .countBy('author')
      .map((blogs, author) => ({ author, blogs }))
      .value()
    const result = _.maxBy(authorsBlogsCount, 'blogs')
    return result
  }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
