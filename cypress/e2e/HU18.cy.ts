describe("HU18: Asociar una película a un actor", () => {
    it("should associate a movie to an actor", () => {
      cy.visit("/home");
      cy.wait(500);
  
      const titleText = 'Link movies with actors';
  
      cy.get('app-navbar #navbarDropdown').click();
      cy.get("app-navbar UL.dropdown-menu a[href='/shared/association?firstEntity=movies&secondEntity=actors']").click();
      cy.get('h1').contains(titleText);
      cy.get("#firstEntity").select("Item, The");
      cy.get("#secondEntity").select("Lorilyn Janoch");
      cy.get("button[type='submit']").click();
      
      cy.get(".overlay-container").should("contain.text", "Entities linked successfully");
    });
  });