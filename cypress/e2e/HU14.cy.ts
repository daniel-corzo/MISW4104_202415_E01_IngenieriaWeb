describe('CrearPeliculaComponent', () => {
    beforeEach(() => {
      cy.visit('/movies/create');
    });
  
    it('should create a new movie', () => {
      cy.get('#title').type('New Movie Title');
      cy.get('#poster').type('https://example.com/poster.jpg');
      cy.get('#duration').type('120');
      cy.get('#country').type('USA');
      cy.get('#releaseDate').type('2023-12-25');
      cy.get('#popularity').type('5');
      cy.get('#genre').select('Action');
      cy.get('#director').select('Ursula Trippitt');
      cy.get('#trailerName').type('New Movie Trailer');
      cy.get('#trailerUrl').type('https://youtube.com/trailer');
      cy.get('#trailerDuration').type('2');
      cy.get('#trailerChannel').type('Movie Channel');
      cy.get('button[type="submit"]').click();
  

      cy.url().should('include', '/movies');
      cy.get(".overlay-container").should('contain.text', 'Movie created succesfully');
    });
}); 