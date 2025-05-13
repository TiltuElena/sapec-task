describe('Admin Login', () => {
  it('Logs in as admin and sees admin dashboard', () => {
    cy.visit('/');

    cy.get('[formcontrolname="email"]').type('admin@gmail.com');
    cy.get('[formcontrolname="password"]').type('admin');
    cy.contains('button', 'Submit').click();

    cy.contains('Successfully logged in').should('exist');
    cy.url().should('include', '/admin')
    cy.contains('Users').should('exist');
  });
});
