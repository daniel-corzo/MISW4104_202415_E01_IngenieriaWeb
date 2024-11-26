describe('HU13 - Crear un genero', () => {
  it('should create a genre', () => {
    cy.visit('/home');
    cy.wait(500);

    cy.get('app-navbar #navbarDropdown').click();
    cy.get("app-navbar UL.dropdown-menu a[href='/genres/create']").click();

    const genreName = 'e2e genre ' + Math.floor(Math.random() * 1000);
   
    cy.get('#nombre').type(genreName);
    cy.get("button[type='submit']").click();
    cy.wait(1000);

    cy.get("app-sidebar div.nav-links a").should('contain.text', genreName);
  })
})
