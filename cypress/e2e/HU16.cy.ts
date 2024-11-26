describe('HU16 - Crear review para pelicula', () => {
  it('should create a review', () => {
    cy.visit('/home');
    cy.wait(500);

    cy.get("app-card-movie").first().click();
    const review = 'e2e review ' + Math.floor(Math.random() * 1000);
    const score = Math.floor(Math.random() * 5) + 1;
    const user = 'e2e user ' + Math.floor(Math.random() * 1000);

    cy.get("div[role='article']").its('length').then((currentReviews) => {
      cy.get('#text').type(review);

      cy.get('#score').type(score.toString());
      cy.get('#creator').type(user);
      cy.get("button[type='submit']").click();

      cy.get("div[role='article']").should('have.length', currentReviews + 1);
    });
  })
})
