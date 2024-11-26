describe('HU03 - Consultar el listado de directores', () => {
  it('should render predefined directors', () => {
    cy.visit('/directors');
    cy.wait(500);

    const directorsExpected = [
      'Ursula Trippitt',
      'Lulu Kerford',
      'Reine Phillps',
      'Blondell Mobley',
      'Edith Prickett',
      'Lemmy Beltzner',
      'Reuben Aspray',
      'Amber Dupey',
      'Werner Crosgrove',
      'Kayley Pattesall',
      'Evaleen Ivashechkin',
      'Bret Clelland'
    ];

    const textTitle = 'Directors';
    const textMoviePerPage = 'Movies per page';
    
    cy.get('h1').contains(textTitle)
    cy.get('.pagination-controls > .title-section').contains(textMoviePerPage);

    cy.get('.col-md-4').each( item => {
      expect(directorsExpected).to.include(item.text());
    });
  });
});