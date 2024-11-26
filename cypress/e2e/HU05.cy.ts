describe('HU05 - Consultar listado de generos', () => {
  it('should render predefined genres', () => {
    cy.visit('/home');
    cy.wait(500);

    const predefinedGenres = ['Drama', 'Crime', 'Film-Noir', 'Fantasy', 'Comedy', 'Action', 'Mystery', 'Musical', 'Thriller', 'Adventure'];

    cy.get("app-sidebar div.nav-links a").each(item => {
      expect(predefinedGenres).to.include(item.text());
    });
  })
})
