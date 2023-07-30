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

module.exports = { dummy, totalLikes }
