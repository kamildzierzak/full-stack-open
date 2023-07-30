const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'My First Blog',
      author: 'Pudding',
      url: 'http://www.uddi.com',
      likes: 12,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'My Second Blog',
      author: 'AddictedToPasta',
      url: 'http://www.waitwhat.com',
      likes: 23,
      __v: 0,
    },
  ]

  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes([blogs[0]])
    expect(result).toBe(12)
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(35)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'My First Blog',
      author: 'Pudding',
      url: 'http://www.uddi.com',
      likes: 333,
      __v: 0,
    },
    {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'My Second Blog',
      author: 'AddictedToPasta',
      url: 'http://www.waitwhat.com',
      likes: 23,
      __v: 0,
    },
  ]

  test('of empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(null)
  })

  test('when list has only one blog returned that blog', () => {
    const result = listHelper.favoriteBlog([blogs[0]])
    expect(result).toEqual({
      title: 'My First Blog',
      author: 'Pudding',
      likes: 333,
    })
  })

  test('of a list is returning the most popular one', () => {
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title: 'My First Blog',
      author: 'Pudding',
      likes: 333,
    })
  })
})
