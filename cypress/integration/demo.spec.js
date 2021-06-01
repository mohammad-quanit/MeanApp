/// <reference types="cypress" />

describe('Our Todo App Test Suite', () => {
  before('Visiting on Application', () => {
    cy.visit('/');
  });

  it('Verifying Navbar Display', () => {
    cy.get('.navbar').should('be.visible');
  });

  it('Getting data from server via xhr GET request', () => {
    // stubbing
    const events = {
      name: "Stronghold",
      date: "5/10/2021",
    };

    cy.intercept(
      {
        method: 'GET',
        path: '/api/events',
      },
      (req) => delete req.headers['if-none-match'],
      { fixture: 'events.json' }
    ).as('events');
    cy.visit('/');

    cy.wait('@events')
      .its('response')
      .should('deep.include', {
        statusCode: 200,
        statusMessage: 'OK',
      })
      .and('have.property', 'body')
      .then((body) => {
        expect(body).to.be.an('array');
      });

    // cy.contains(
    //   '.card-item > .card > .card-body > .card-title',
    //   events.name
    // ).should('be.visible');

    cy.get('[data-cy=events] > .card-item').should('have.length', 20);
  });

  it('Should redirect to login page without authentication', () => {
    cy.visit("/special-events")
    cy.url().should('include', '/login')
    cy.contains('Login')
  });

  it('Should redirect to login page after login', () => {
    cy.get('[routerlink="/login"]').click()
    cy.get('#email').type('admin@gmail.com')
    cy.get('#password').type('admin');
    cy.get('.btn').click()
    cy.url().should('include', '/special-events')
    cy.contains('Members')
  });
});
