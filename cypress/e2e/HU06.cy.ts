describe('HU06 - Consultar informacion detallada de un genero', () => {
    it('should see gender details', () => {
        cy.visit('/home');
        cy.wait(500);

        cy.get("app-sidebar div.nav-links a")
            .first()
            .click();

        cy.url().should('include', '/genres/');
        cy.get("h1").should('contain.text', 'Drama movies');
        cy.get("app-card-movie").should('have.length.greaterThan', 0);
    })
})
