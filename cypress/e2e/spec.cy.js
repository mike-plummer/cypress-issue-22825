describe('empty spec', () => {
  it('passes', () => {
    cy.intercept('/api/1', {
      statusCode: 201,
      body: ''
    }).as('myRequest')

    cy.visit('index.html')

    cy.wait('@myRequest')
  })
})