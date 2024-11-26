describe('HU04 - Consultar la información detallada del director', () => {
  it('should render director details', () => {
    cy.visit('/directors');

    const directorExpected = {
      name: 'Ursula Trippitt',
      birthdate: 'Dec 5, 1939',
      nationality: 'Egypt',
      biography: 'Stand-alone user-facing process improvement',
    }

    const textTitle = 'Director details';

    cy.get('.col-md-4').contains(directorExpected.name).click();
    cy.get('h1').contains(textTitle);
    cy.get('h2.mt-3').contains(directorExpected.name);
    cy.get('p').contains(directorExpected.birthdate);
    cy.get('p').contains(directorExpected.nationality);
  });
});