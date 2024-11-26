describe("HU20: Asociar una película a una plataforma", () => {
  it("should associate a movie to a platform", () => {
    cy.visit("/home");
    cy.wait(500);

    const titleText = 'Link movies with platforms';

    cy.get('app-navbar #navbarDropdown').click();
    cy.get("app-navbar UL.dropdown-menu a[href='/shared/association?firstEntity=movies&secondEntity=platforms']").click();
    cy.get('h1').contains(titleText);
    cy.get("#firstEntity").select("The Count of Monte Cristo");
    cy.get("#secondEntity").select("Skimia");
    cy.get("button[type='submit']").click();
    
    cy.get(".overlay-container").should("contain.text", "Entities linked successfully");
  });
});