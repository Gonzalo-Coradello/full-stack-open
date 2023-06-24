describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Gonzalo Coradello',
      username: 'gonzaloc',
      password: 'secret'
    }

    const otherUser = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.request('POST', 'http://localhost:3001/api/users/', otherUser)
    cy.visit('http://localhost:3000')
  })

  it('login form is shown', function() {
    cy.contains('Log in')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('gonzaloc')
      cy.get('#password').type('secret')
      cy.get('button').click()

      cy.contains('Gonzalo Coradello logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('gonzaloc')
      cy.get('#password').type('wrong')
      cy.get('button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3001/api/login', { username: 'gonzaloc', password: 'secret' })
        .then(response => localStorage.setItem('user', JSON.stringify(response.body)))

      cy.visit('http://localhost:3000')
    })

    it('a blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input[placeholder="write blog title here"]')
        .type('End to End testing with Cypress')
      cy.get('input[placeholder="John Doe"]')
        .type('Gonzalo Coradello')
      cy.get('input[placeholder="https://yoursite.com"]')
        .type('http://localhost:3001/api/blogs/13')
      cy.contains('create').click()

      cy.contains('End to End testing with Cypress - Gonzalo Coradello')
      cy.get('.success')
        .should('contain', 'New blog "End to End testing with Cypress" by Gonzalo Coradello created')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    describe('When there are blogs in the list', function() {
      beforeEach(function() {
        cy.request({
          url: 'http://localhost:3001/api/blogs',
          method: 'POST',
          body: {
            title: 'End to End testing with Cypress',
            author: 'Gonzalo Coradello',
            url: 'http://localhost:3001/api/blogs/13'
          },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
          }
        })
        
        cy.request({
          url: 'http://localhost:3001/api/blogs',
          method: 'POST',
          body: {
            title: 'Differences between unit, integration and E2E testing',
            author: 'Gonzalo Coradello',
            url: 'http://localhost:3001/api/blogs/14'
          },
          headers: {
            'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
          }
        })
  
        cy.visit('http://localhost:3000')
      })
  
      it('users can like a blog', function() {
        cy.contains('view').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('the user who created the blog can delete it', function() {
        cy.contains('view').click()
        cy.contains('remove').click()
        cy.on('window:confirm', () => true)
        cy.contains('End to End testing with Cypress - Gonzalo Coradello').should('not.exist')
        cy.contains('Blog deleted')
      })

      describe('When a different user is logged in', function() {
        beforeEach(function() {
          cy.request('POST', 'http://localhost:3001/api/login', { username: 'mluukkai', password: 'salainen' })
            .then(response => localStorage.setItem('user', JSON.stringify(response.body)))

          cy.visit('http://localhost:3000')
        })

        it.only('should not see the delete button', function() {
          cy.contains('view').click()
          cy.contains('remove').should('not.exist')
        })
      })
    })
  })
})