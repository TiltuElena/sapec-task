describe('User Management', () => {
  beforeEach(() => {
    cy.login('admin@gmail.com', 'admin');
    cy.visit('admin/users');
  });

  it('should delete an existing user from the table', () => {
    const userName = 'user 1';

    cy.contains('brn-table', userName).should('exist');

    cy.get('brn-table').should('contain', userName);

    cy.get('brn-table')
      .find('cdk-row')
      .contains(userName)
      .parents('cdk-row')
      .within(() => {
        cy.get('button[variant="ghost"]').click();
      });

    cy.contains('button', 'Edit user').click();
    cy.get('input#fullName').clear().type('Test User');

    cy.contains('button', 'Save changes').click();

    cy.get('brn-table').should('contain', 'Test User');
  });
});
