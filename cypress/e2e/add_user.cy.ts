describe('User Management - Add User', () => {
  beforeEach(() => {
    // Visit the user registration page
    cy.visit('http://localhost:4200/register');  // Change the route if needed

    // Intercept the API call for registration
    cy.intercept('POST', '**/api/auth/register', {
      statusCode: 200,
      body: {
        status: true,
        message: 'User registered successfully',
        data: {
          id: '123',
          username: 'testuser',
          email: 'testuser@example.com',
          firstName: 'Test',
          lastName: 'User',
          cin: 'CIN123456',
          nationality: 'Testland',
          role: 'User'
        }
      }
    }).as('registerUser');
  });

  it('should successfully add a new user', () => {
    // Fill the registration form
    cy.get('input[formControlName="username"]').type('testuser');
    cy.get('input[formControlName="email"]').type('testuser@example.com');
    cy.get('input[formControlName="password"]').type('password123');
    cy.get('input[formControlName="firstName"]').type('Test');
    cy.get('input[formControlName="lastName"]').type('User');
    cy.get('input[formControlName="cin"]').type('CIN123456');
    cy.get('input[formControlName="nationality"]').type('Testland');

    // Click the submit button
    cy.get('button[type="submit"]').click();

    // Wait for the API request to complete
    cy.wait('@registerUser');

    cy.url().should('include', '/login');
    // Verify that a success message appears
    cy.contains('User registered successfully').should('exist');
  });
});
