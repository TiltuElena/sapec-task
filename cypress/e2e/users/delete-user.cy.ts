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

    cy.contains('button', 'Delete user').click();

    cy.contains('button', 'Delete').click();

    cy.get('brn-table').should('not.contain', userName);
  });
});
