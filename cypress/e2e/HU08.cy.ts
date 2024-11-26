describe('ListadoPeliculasComponent y DetallePeliculaComponent', () => {
    beforeEach(() => {
      cy.visit('/movies');
    });
  
    it('should navigate to movie detail page from movie list', () => {
      cy.get('#itemsPerPage').select('12');
      cy.get('[role="listitem"]').should('have.length', 12);
      cy.get('[role="listitem"]').first().click();
      cy.url().should('include', '/movies/');
      cy.get('#movie-title').should('contain.text', 'Item, The');
    });
  
    it('should submit a review', () => {
      cy.get('#itemsPerPage').select('12');
      cy.get('[role="listitem"]').first().click();
      cy.url().should('include', '/movies/');
      cy.get('textarea[formControlName="text"]').type('Great movie!');
      cy.get('input[formControlName="score"]').type('5');
      cy.get('input[formControlName="creator"]').type('Reviewer');
      cy.get('button[type="submit"]').click();
      cy.get('.card.bg-dark.text-light').should('contain.text', 'Great movie!');
    });
  });
  