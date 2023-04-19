export class HomePage {
  constructor() {
    this.registerLinkSelector = ".clear.session > li:nth-of-type(1) > a";
    this.communityDropDownMenu = "nav ul.tabs li.n.on a.n";
    this.profilIcon = ".avatar";
  }

  navigateToRegistersPage() {
    cy.get(this.registerLinkSelector).should("be.visible").click();
    cy.url().should("eq", "https://www.indiedb.com/members/register");
  }
  navigateToTheForumPage() {
    cy.get("nav").contains("Community").trigger("mouseover");

    cy.get("nav").contains("Forum").click();
    cy.url().should("eq", "https://www.indiedb.com/forum");
  }
  navigateToEditProfilePage() {
    cy.get(this.profilIcon).should("be.visible").click();
    cy.url().should("include", "/edit#membersform");
  }
}

export const homePage = new HomePage();
