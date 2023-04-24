const { registerPage } = require("../page_objects/registerPage.js");
import "cypress-file-upload";

export class ProfilePage {
  constructor() {
    this.usernameInputField = "input#membersusername";
    this.profileURLInputField = "input#membersnameid";
    this.saveProfileButton = "input#memberssubmit";
    this.uploadAvatarButton = "input#membersavatar";
    this.uploadImagePreview = "img[alt='Preview image']";
    this.avatarSuccessToolTip = ".successtooltip p";
  }

  editProfileURL() {
    let newProfileURL = registerPage.generateRandomUsername().slice(0, 20);
    cy.intercept("POST", "/members/*/edit/").as("editProfile");

    cy.get(this.profileURLInputField).clear().type(newProfileURL);
    cy.get(this.saveProfileButton).click();

    cy.url().should("include", newProfileURL);
    cy.get(this.profileURLInputField)
      .invoke("val")
      .then((value) => {
        expect(value.trim()).to.eq(newProfileURL);
      });
    cy.wait("@editProfile").its("response.statusCode").should("eq", 302);
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

  uploadAvatar() {
    const imagePath = "avatar.jpg";
    cy.get(this.uploadAvatarButton).then((subject) => {
      cy.fixture(imagePath, "binary").then(function (fileContent) {
        const blob = Cypress.Blob.binaryStringToBlob(fileContent);
        const testFile = new File([blob], imagePath, { type: "image/jpg" });
        const dataTransfer = new DataTransfer();
        const fileInput = subject[0];
        dataTransfer.items.add(testFile);
        fileInput.files = dataTransfer.files;
      });
    });
    cy.get(this.saveProfileButton).click();
    cy.get(this.avatarSuccessToolTip)
      .should("contain", "Your changes have")
      .and("contain", "been saved");
    cy.get(this.uploadImagePreview).should("be.visible");
  }
}

export const profilePage = new ProfilePage();
