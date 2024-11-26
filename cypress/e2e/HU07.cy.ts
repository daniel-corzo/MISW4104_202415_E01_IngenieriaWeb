describe('ListadoPeliculasComponent', () => {
    beforeEach(() => {
      cy.visit('/movies');
    });
  
    it('should display the correct number of movies per page', () => {
      cy.get('#itemsPerPage').select('12');
      cy.get('[role="listitem"]').should('have.length', 12);
    });
  
    it('should navigate to the next page', () => {
      cy.get('#itemsPerPage').select('12');
      cy.get('[aria-label="Next page"]').click();
      cy.get('[role="listitem"]').should('have.length', 12);
    });
  
    it('should navigate to the previous page', () => {
      cy.get('#itemsPerPage').select('12');
      cy.get('[aria-label="Next page"]').click();
      cy.get('[aria-label="Previous page"]').click();
      cy.get('[role="listitem"]').should('have.length', 12);
    });
  
    it('should change the number of items per page', () => {
      cy.get('#itemsPerPage').select('8');
      cy.get('[role="listitem"]').should('have.length', 8);
      cy.get('#itemsPerPage').select('16');
      cy.get('[role="listitem"]').should('have.length', 16);
    });
  
    it('should navigate to movie detail page when a movie is clicked', () => {
      cy.get('[role="listitem"]').first().click();
      cy.url().should('include', '/movies/');
    });
  });
  