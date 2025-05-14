describe('User Management', () => {
  beforeEach(() => {
    cy.login('admin@gmail.com', 'admin');
    cy.visit('admin/users');
  });

  it('should create a new user and display it in the table', () => {
    cy.visit('admin/users');

    cy.contains('button', 'Create new user').click();

    cy.get('input#fullName').type('Test User');
    cy.get('input#email').type('testuser@example.com');

    cy.get('#role').click();
    cy.get('hlm-option').contains('Admin').click();

    cy.get('#creationTime').click();
    cy.get('.p-datepicker-today').click();

    cy.get('#status').click();
    cy.get('hlm-option').contains('Active').click();

    cy.contains('button', 'Create user').click();

    cy.get('hlm-select-trigger').contains(/^\d+$/).click(); // Opens current page size trigger (e.g., "10")

    cy.get('hlm-option').contains('All').click();

    cy.get('brn-table').should('contain', 'Test User');
    cy.get('brn-table').should('contain', 'testuser@example.com');
  });
});
