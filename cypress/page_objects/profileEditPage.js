const { registerPage } = require("../page_objects/registerPage.js");

export class ProfilePage {
  constructor() {
    this.usernameInputField = "input#membersusername";
    this.profileURLInputField = "input#membersnameid";
    this.saveProfileButton = "input#memberssubmit";
  }
  editProfileURL() {
    let newProfileURL = registerPage.generateRandomUsername().slice(0, 20);
    cy.intercept('POST', '/members/*/edit/').as('editProfile');
    
    cy.get(this.profileURLInputField).clear().type(newProfileURL);
    cy.get(this.saveProfileButton).click();

    cy.url().should("include", newProfileURL);
    cy.get(this.profileURLInputField)
      .invoke("val")
      .then((value) => {
        expect(value.trim()).to.eq(newProfileURL);
      }); 
      cy.wait('@editProfile').its('response.statusCode').should('eq', 302);
  }
  editUserName() {
    let newProfileURL = registerPage.generateRandomUsername().slice(0, 20);
    cy.get(this.usernameInputField).clear().type(newProfileURL);
    cy.get(this.saveProfileButton).click();

    cy.get(this.usernameInputField)
      .invoke("val")
      .then((value) => {
        expect(value.trim()).to.eq(newProfileURL);
      }); 
 
  }
}

export const profilePage = new ProfilePage();
