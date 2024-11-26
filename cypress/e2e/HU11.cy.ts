describe('CrearActorComponent', () => {
    beforeEach(() => {
      cy.visit('/actors/create');
    });
  
    it('should create a new actor', () => {
      cy.get('#nombre').type('John Doe');
      cy.get('#foto').type('https://example.com/photo.jpg');
      cy.get('#nacionalidad').type('USA');
      cy.get('#fechaNacimiento').type('1980-01-01');
      cy.get('#biografia').type('John Doe is an American actor known for his roles in various films.');
      cy.get('button[type="submit"]').click();

      cy.url().should('include', '/actors');
      cy.get(".overlay-container").should('contain.text', 'Actor created successfully');
    });
  });
  