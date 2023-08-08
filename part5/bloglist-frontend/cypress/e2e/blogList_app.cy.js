describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Me',
      username: 'testme',
      password: 'test',
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
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
      cy.get('#username').type('testme')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
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
  })
})