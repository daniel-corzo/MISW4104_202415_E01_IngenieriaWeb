import { faker } from '@faker-js/faker';

describe('HU12 - Crear un director', () => {
  it('should create a director', () => {
    cy.visit('/home');
    cy.wait(500);

    cy.get('app-navbar #navbarDropdown').click();
    cy.get("app-navbar UL.dropdown-menu a[href='/directors/create']").click();

    const directorName = faker.person.fullName();
    const directorPhoto = faker.image.avatar();
    const directorNationality = faker.location.country();
    const directorBirthdate = "1968-12-05";
    const directorDescription = faker.lorem.paragraph();

    cy.get('#nombre').type(directorName);
    cy.get('#foto').type(directorPhoto);
    cy.get('#nacionalidad').type(directorNationality);
    cy.get('#fechaNacimiento').type(directorBirthdate);
    cy.get('#biografia').type(directorDescription);
    cy.get("button[type='submit']").click();
    cy.wait(1000);

    cy.get(".overlay-container").should('contain.text', 'Director created successfully');
  });
});