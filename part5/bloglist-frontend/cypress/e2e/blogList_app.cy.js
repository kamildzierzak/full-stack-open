describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const user1 = {
      name: 'Test Me',
      username: 'testme',
      password: 'test',
    }

    const user2 = {
      name: 'User',
      username: 'user',
      password: 'use',
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
  })

  it('Login form is shown', function () {
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('testme')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Test Me logged in')
      cy.get('#logout-button')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('testme')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .contains('Wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'testme', password: 'test' })
      cy.createBlog({
        title: 'Do you like me?',
        author: 'pizzaLover',
        url: 'www.like.me',
        likes: 1,
        user: {
          name: 'Test Me',
          username: 'testme',
          password: 'test',
        },
      })
    })

    it('A blog can be created', function () {
      cy.contains('New blog').click()
      cy.get('#title').type('Do you really like pizza?')
      cy.get('#author').type('pizzaLover')
      cy.get('#url').type('www.pizza4ever.com')
      cy.get('#create-button').click()
      cy.contains('a new blog Do you really like pizza? by pizzaLover added')
      cy.get('#blogs').contains('Do you really like pizza? pizzaLover')
    })

    it('A blog can be liked', function () {
      cy.get('#blogs')
        .contains('Do you like me? pizzaLover')
        .parent()
        .find('button')
        .as('viewButton')
      cy.get('@viewButton').click()
      cy.get('.blogDetailedInfo').get('#likeButton').as('likeButton')
      cy.get('@likeButton').click()
    })

    it('A blog can be deleted', function () {
      cy.get('#blogs').contains('Do you like me? pizzaLover').as('blog')
      cy.get('@blog').parent().find('button').as('viewButton')
      cy.get('@viewButton').click()
      cy.get('.blogDetailedInfo').get('#deleteButton').as('deleteButton')
      cy.get('@deleteButton').click()
      cy.get('@blog').should('not.exist')
    })

    it('A remove blog button should be visible only for the creator', function () {
      cy.login({ username: 'user', password: 'use' })
      cy.createBlog({
        title: 'User is my creator!',
        author: 'someGuy',
        url: 'www.user4ever.com',
        user: {
          name: 'User',
          username: 'user',
          password: 'use',
        },
      })
      cy.login({ username: 'testme', password: 'test' })

      cy.get('#blogs').contains('User is my creator! someGuy').as('blog')
      cy.get('@blog').parent().find('button').as('viewButton')
      cy.get('@viewButton').click()
      cy.get('.blogDetailedInfo').get('#deleteButton').should('not.exist')
    })

    it('Blogs are ordered according to likes, with the most likes being first', function () {
      cy.createBlog({
        title: 'I should be first!',
        author: 'winner',
        url: 'www.win.com',
        likes: 2,
        user: {
          name: 'Test Me',
          username: 'testme',
          password: 'test',
        },
      })
      cy.get('#blogs > div')
        .eq(0)
        .should('contain', 'I should be first! winner')
        .as('exWinner')
      cy.get('#blogs > div')
        .eq(1)
        .should('contain', 'Do you like me? pizzaLover')
        .as('newWinner')
      cy.get('@newWinner').find('button').as('viewButton')
      cy.get('@viewButton').click()
      cy.get('.blogDetailedInfo').get('#likeButton').as('likeButton')
      cy.get('@likeButton').click()
      cy.get('@likeButton').click()
      cy.wait(2000)
      cy.get('#blogs > div')
        .eq(0)
        .should('contain', 'Do you like me? pizzaLover')
    })
  })
})
