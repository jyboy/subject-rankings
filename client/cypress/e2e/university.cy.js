describe('The University page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders title, subject and universities in English', () => {
    cy.get('[data-testid="university-title"]').should(
      'have.text',
      'Chinese University Rankings'
    );
    cy.get('[data-testid="selected-subject"]').should(
      'have.text',
      'Mechanical Engineering'
    );
    cy.get('[data-testid="university-list"]').contains(
      'Shanghai Jiao Tong University'
    );
  });

  it('switches page text to Chinese', () => {
    cy.get('.fab').first().click();
    cy.get('[data-testid="university-title"]').should(
      'have.text',
      '中国大学排名'
    );
    cy.get('[data-testid="selected-subject"]').should('have.text', '机械工程');
    cy.get('[data-testid="university-list"]').contains('上海交通大学');
  });

  it('loads university logos from CDN', () => {
    cy.get('.university-logo>img').each(($logo) => {
      cy.wrap($logo).invoke('prop', 'naturalWidth').should('be.greaterThan', 0);
    });
  });
});
