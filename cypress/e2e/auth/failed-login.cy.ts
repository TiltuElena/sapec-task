describe('Failed Login', () => {
  it('Shows an error or stays on login after invalid credentials', () => {
    cy.visit('/');

    cy.get('[formcontrolname="email"]').type('wrong@example.com');
    cy.get('[formcontrolname="password"]').type('wrongpassword');
    cy.contains('button', 'Submit').click();

    cy.get('[formcontrolname="email"]').should('have.value', '');
    cy.get('[formcontrolname="password"]').should('have.value', '');

    cy.url().should('include', '/login');
    cy.contains('Incorrect credentials').should('exist');
  });
});
