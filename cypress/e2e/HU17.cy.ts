describe("HU17: Asociar un actor a una película", () => {
    it("should associate an actor to a movie", () => {
      cy.visit("/home");
      cy.wait(500);
  
      const titleText = 'Link actors with movies';
  
      cy.get('app-navbar #navbarDropdown').click();
      cy.get("app-navbar UL.dropdown-menu a[href='/shared/association?firstEntity=actors&secondEntity=movies']").click();
      cy.get('h1').contains(titleText);
      cy.get("#firstEntity").select("Barnett Campagne");
      cy.get("#secondEntity").select("Item, The");
      cy.get("button[type='submit']").click();
      
      cy.get(".overlay-container").should("contain.text", "Entities linked successfully");
    });
  });