// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const loginButton = ".loginlink";
const loginModalList = 'i#logintoggle';
const loginModal = ".form"
const emailInputField = "#loginusername";
const passwordInputField = "input[name='password']";
const signInButton ="input[value='Sign In']"

Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.intercept('POST', 'https://www.indiedb.com/members/login').as('loginRequest');
    cy.get(loginButton).click();
    cy.get(loginModal).should('be.visible');
    cy.get(emailInputField).type(username).should('be.visible');
    cy.get(passwordInputField).type(password).should('be.visible');
    cy.get(signInButton).should('be.visible').click();
    cy.wait('@loginRequest').then((interception) => {
        expect(interception.response.statusCode).to.eq(302);
    });
});

  
  



  
  
  