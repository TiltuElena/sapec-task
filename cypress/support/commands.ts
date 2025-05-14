Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/login')
  cy.get('[formcontrolname="email"]').type(email);
  cy.get('[formcontrolname="password"]').type(password);
  cy.contains('button', 'Submit').click();
})
