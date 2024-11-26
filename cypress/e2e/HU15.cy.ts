describe('HU15 - Crear una plataforma', () => {
  it('should create a platform', () => {
    cy.visit('/home');
    cy.wait(500);

    cy.get('app-navbar #navbarDropdown').click();
    cy.get("app-navbar UL.dropdown-menu a[href='/platforms/create']").click();

    const platformName = 'e2e-platform' + Math.floor(Math.random() * 1000);

    cy.get('#nombre').type(platformName);
    cy.get('#url').type('https://www.' + platformName + '.com');
    cy.get("button[type='submit']").click();
    cy.wait(1000);

    cy.get(".overlay-container").should('contain.text', 'Platform created successfully');
  });
});