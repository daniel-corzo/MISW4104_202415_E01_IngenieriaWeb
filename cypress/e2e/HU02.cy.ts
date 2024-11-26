describe('ListadoActoresComponent y DetalleActorComponent', () => {
    beforeEach(() => {
      cy.visit('/actors');
    });
  
    it('should navigate to actor detail page from actor list', () => {
      cy.get('#itemsPerPage').select('12');
      cy.get('[role="listitem"]').should('have.length', 12);
      cy.get('[role="listitem"]').first().click();
      cy.url().should('include', '/actors/');
      cy.get('[role="article"]').within(() => {
        cy.get('h2').should('contain.text', 'Barnett Campagne');
      });
    });
  
    it('should navigate to movie detail page when a movie is clicked', () => {
      cy.get('#itemsPerPage').select('12');
      cy.get('[role="listitem"]').first().click();
      cy.url().should('include', '/actors/');
      cy.get('[role="listitem"]').first().click();
      cy.url().should('include', '/movies/');
    });
  });
  