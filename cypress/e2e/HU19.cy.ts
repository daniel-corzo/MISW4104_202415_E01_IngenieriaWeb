describe("HU19: Asociar una plataforma a una película", () => {
  it("should associate a platform to a movie", () => {
    cy.visit("/home");
    cy.wait(500);

    const titleText = 'Link platforms with movies';

    cy.get('app-navbar #navbarDropdown').click();
    cy.get("app-navbar UL.dropdown-menu a[href='/shared/association?firstEntity=platforms&secondEntity=movies']").click();
    cy.get('h1').contains(titleText);
    cy.get("#firstEntity").select("Skimia");
    cy.get("#secondEntity").select("The Count of Monte Cristo");
    cy.get("button[type='submit']").click();
    
    cy.get(".overlay-container").should("contain.text", "Entities linked successfully");
  });
});