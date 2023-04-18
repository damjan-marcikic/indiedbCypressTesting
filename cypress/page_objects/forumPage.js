export class ForumPage {
  constructor() {
    this.registerLinkSelector = ".clear.session > li:nth-of-type(1) > a";
    this.communityDropDownMenu = "nav ul.tabs li.n.on a.n";
  }

  allMessagesChecker(forumName) {
    let isFirstGreaterThanOrEqual = true;
    const formattedForumName = forumName.toLowerCase().replace(/[\s&]+/g, "-");
    const expectedUrl = `https://www.indiedb.com/forum/board/${formattedForumName}`;
    const daysSinceYearStart = Math.ceil(
      (Date.now() - new Date(new Date().getFullYear(), 0, 1)) /
        (1000 * 60 * 60 * 24)
    );

    cy.get("table#tableforum").contains(forumName).click();
    cy.url().should("eq", expectedUrl);

    cy.get("tr.subcategory").each(($row, i, $rows) => {
      cy.wrap($row)
        .find(".posts")
        .invoke("text")
        .then((postCountText) => {
          const postCount = parseInt(postCountText.replace(/\D+/g, ""));
          if (postCount >= daysSinceYearStart) {
            cy.log(
              `Message count for row ${
                i + 1
              } is ${postCount} and is greater than or equal to days since year start (${daysSinceYearStart}).`
            );

            if (isFirstGreaterThanOrEqual) {
              isFirstGreaterThanOrEqual = false;
              expect(postCount).to.be.lessThan(daysSinceYearStart);
            }
          } else {
            cy.log(
              `Message count for row ${
                i + 1
              } is ${postCount} and is less than days since year start (${daysSinceYearStart}).`
            );
          }
        });
    });
  }
}

export const forumPage = new ForumPage();
