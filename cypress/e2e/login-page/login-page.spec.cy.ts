describe('Login page', () => {
  it('Visits the initial project page and redirects to login page', () => {
    cy.visit('/');
    cy.get('fim-login-page').should('be.visible');
    cy.get('fim-login-page-form').should('be.visible');
  });
});
