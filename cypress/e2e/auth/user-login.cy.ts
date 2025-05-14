describe('User Authentication', () => {
  it('Logs in', () => {
    cy.visit('/');
    cy.get('input[formcontrolname="email"]').type('user@gmail.com');
    cy.get('input[formcontrolname="password"]').type('user');
    cy.contains('button', 'Submit').click();

    cy.contains('Successfully logged in').should('exist');
    cy.url().should('include', '/user')
    cy.get('app-data-overview').should('exist');
    cy.get('app-purchases-data-chart').should('exist');
  });
});
