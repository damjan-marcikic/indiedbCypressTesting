const { homePage } = require("../page_objects/homePage.js");
const { registerPage } = require("../page_objects/registerPage.js");
const { forumPage } = require("../page_objects/forumPage.js");
const { profilePage } = require("../page_objects/profileEditPage.js");
let userData;

describe("IndieDB Forum End-to-end Cypress testing", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.clearCookies();
    cy.fixture("example.json").then((data) => {
      userData = data;
    });
  });

  it("Verifies that a user cannot register with an email address that is already in use", () => {
    homePage.navigateToRegistersPage();
    registerPage.registerUserNegative(
      userData.userInfo.year,
      userData.userInfo.month,
      userData.userInfo.day,
      userData.userInfo.mail
    );
  });

  it("Verifies that a user can successfully register a new account with valid information", () => {
    homePage.navigateToRegistersPage();
    registerPage.registerUserPositive(
      userData.userInfo.year,
      userData.userInfo.month,
      userData.userInfo.day
    );
  });

  it("Verifies that a user can login and access the forum page, and checks all messages in the specified forum ", () => {
    cy.login(userData.userInfo.mail, userData.userInfo.password);
    homePage.navigateToTheForumPage();
    forumPage.allMessagesChecker(userData.forumInfo.forumName);
  });

  it("Verify that the user can successfully edit the profile information", () => {
    cy.login(userData.userInfo.mail, userData.userInfo.password);
    homePage.navigateToEditProfilePage();
    profilePage.editProfileURL();
    profilePage.editUserName();
  });

  it("Verify that the user is able to upload an avatar on the profile page", () => {
    cy.login(userData.userInfo.mail, userData.userInfo.password);
    homePage.navigateToEditProfilePage();
    profilePage.uploadAvatar();
  });
});
