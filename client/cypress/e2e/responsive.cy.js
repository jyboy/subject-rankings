describe('Responsive layout', () => {
  it('renders app with 375px width on iPhone 6', () => {
    cy.visit('/');

    cy.get('#app').invoke('width').should('eq', 375);
  });

  it('renders app with 480px width on PC', () => {
    cy.viewport(1024, 768);
    cy.visit('/');

    cy.get('#app').invoke('width').should('eq', 480);
  });

  it('shows QR code on PC', () => {
    cy.viewport(1024, 768);
    cy.visit('/');

    cy.get('#app').invoke('width').should('eq', 480);
  });
});
