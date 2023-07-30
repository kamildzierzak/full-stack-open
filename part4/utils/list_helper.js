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

module.exports = { dummy, totalLikes, favoriteBlog }
