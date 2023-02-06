import MyComponent from './MyComponent.svelte'
import { mount } from 'cypress/svelte'

describe('MyComponent', () => {
  it('Should do the things', () => {
    cy.intercept('/api/sometendpoint').as('request')
    mount(MyComponent)
    cy.get('[data-test="header"]').should('contain', 'Hello world')

    cy.wait('@request')
  })
})