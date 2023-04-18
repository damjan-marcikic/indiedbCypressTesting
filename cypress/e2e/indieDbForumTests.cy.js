
const { homePage } = require('../page_objects/homePage.js');
const { registerPage } = require('../page_objects/registerPage.js');
const { forumPage } = require('../page_objects/forumPage.js');
const { profilePage } = require('../page_objects/profileEditPage.js');

describe('IndieDB Forum End-to-end Cypress testing', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.clearLocalStorage()
        cy.clearCookies();
    });

    it('The user is not able to register a new user with a existing email', () => {
        homePage.navigateToRegistersPage();
        registerPage.registerUserNegative('1970', 'April', '20', Cypress.env("invalidEmail"));
    });

    it('The user is able to successfully register a new account', () => {
        homePage.navigateToRegistersPage();
        registerPage.registerUserPositive('1970', 'April', '20');
    });

    it('login test', ()=>{
        cy.login(Cypress.env("email"), Cypress.env("password"));
        homePage.navigateToTheForumPage();
        forumPage.allMessagesChecker('3D Modeling & Animating')
    });

    it('The user is able to change', ()=>{
        cy.login(Cypress.env("email"), Cypress.env("password"));
        homePage.navigateToEditProfilePage();
        profilePage.editProfileURL();
        profilePage.editUserName();

        
    });
});