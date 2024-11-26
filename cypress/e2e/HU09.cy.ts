describe("HU09 - Consultar el listado de plataformas", () => {
  it('should render predefined platforms', () => {
    cy.visit('/platforms');
    cy.wait(500);

    const platformsExpected = [
      'Zoombox',
      'Jetwire',
      'Twitterbridge',
      'Brightbean'
    ];

    const textTitle = 'Platforms';
    const textMoviePerPage = 'Platforms per page';

    cy.get('h1').contains(textTitle)
    cy.get('.pagination-controls > .title-section').contains(textMoviePerPage);

    cy.get('.card-body').each( item => {
      expect(platformsExpected).to.include(item.text());
    });
  });
});