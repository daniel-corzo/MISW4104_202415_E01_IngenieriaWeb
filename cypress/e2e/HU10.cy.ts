describe("HU010 - Consultar la información detallada de una plataforma", () => {
  it('should render predefined platforms', () => {
    cy.visit('/platforms');
    cy.wait(500);

    const platformsExpected = {
      name: 'Zoombox',
      link: 'https://icq.com/sed/augue/aliquam/erat/volutpat/in.png',
      movies: [
        'Item, The',
        'Look Who\'s Talking',
        'Good For Nothing',
        'Robin Hood',
        'Arrowsmith',
        'Brief Encounter',
        'Those Who Love Me Can Take the Train (Ceux qui m\'aiment prendront le train)',
        'New Gladiators (I guerrieri dell\'anno 2072)',
        'Kids',
        'Farscape: The Peacekeeper Wars',
        'Michael the Brave (Mihai Viteazul)',
        'Stranger in Town, A',
      ]
    };

    const textTitle = 'Platform details';

    const textSubtitle = 'Movies';

    cy.get('.card-body').contains(platformsExpected.name).click();
    cy.get('h1').contains(platformsExpected.name);
    cy.get('h2.title-section').contains(textTitle);
    cy.get('h2.movies-title').contains(textSubtitle);
    cy.get('a').contains(platformsExpected.link);
    cy.get('.col-sm-6').each( item => {
      expect(platformsExpected.movies).to.include(item.text());
    });
  });
});