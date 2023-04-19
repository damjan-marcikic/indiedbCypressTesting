
export class RegisterPage {
    constructor() {
        this.emailInputField = 'input#membersemail';
        this.usernameInputField = 'input#membersusername';
        this.passwordInputField = 'input#memberspassword';
        this.submitButton = 'input#memberssubmit';
        this.yearsDropDownSelect = 'select#membersyear';
        this.monthsDropDownSelect = 'select#membersmonth';
        this.daysDropDownSelect = 'select#membersday';
        this.termsOfUseCheckBox = 'input#membersterms';
        this.userNameAvailabitiy = '.availability';
        this.resendEmailConfirmation = 'div#resetemaildisplay';
        this.emailAlreadyRegisteredToolTip = ".clear.errortooltip.tooltip";

    }

    registerUserPositive(years, months, days) {
        cy.intercept('POST', 'https://www.indiedb.com/members/register/').as('register')
        cy.get(this.emailInputField).should('be.visible').type(this.generateRandomEmail());
        cy.get(this.usernameInputField).should('be.visible').type(this.generateRandomUsername());
        cy.get(this.userNameAvailabitiy).should('contain', 'available');
        cy.get(this.passwordInputField).should('be.visible').type(this.generateRandomPassword());
        cy.get(this.yearsDropDownSelect).select(years);
        cy.get(this.monthsDropDownSelect).select(months);
        cy.get(this.daysDropDownSelect).select(days);
        cy.get(this.termsOfUseCheckBox).click();
        cy.get(this.submitButton).should('be.visible').click();
        cy.get(this.resendEmailConfirmation).should('be.visible').should('contain', 'An email has been sent with a link to confirm your email address.');
        cy.wait('@register').then((interception) => {
            expect(interception.response.statusCode).to.equal(302)
        })
    }

    registerUserNegative(years, months, days, email) {
        cy.intercept('POST', 'https://www.indiedb.com/members/register/').as('register')
        cy.get(this.emailInputField).should('be.visible').type(email);
        cy.get(this.usernameInputField).should('be.visible').type(this.generateRandomUsername());
        cy.get(this.userNameAvailabitiy).should('contain', 'available');
        cy.get(this.passwordInputField).should('be.visible').type(this.generateRandomPassword());
        cy.get(this.yearsDropDownSelect).select(years);
        cy.get(this.monthsDropDownSelect).select(months);
        cy.get(this.daysDropDownSelect).select(days);
        cy.get(this.termsOfUseCheckBox).click();
        cy.get(this.submitButton).should('be.visible').click();
        cy.get(this.emailAlreadyRegisteredToolTip).should('be.visible').should('contain', 'The email entered has already').and('contain', 'been registered')
        cy.wait('@register').then((interception) => {
            expect(interception.response.statusCode).to.equal(200)
        })
    }

    generateRandomEmail() {
        const timestamp = new Date().getTime().toString();
        const randomString = Math.random().toString(36).slice(-8);
        const emailExtensions = ['yahoo.com', 'gmail.com', 'hotmail.com', 'outlook.com', 'aol.com'];
        const randomExtensionIndex = Math.floor(Math.random() * emailExtensions.length);
        const randomExtension = emailExtensions[randomExtensionIndex];
        return `testuser${timestamp}-${randomString}@${randomExtension}`;
    }

    generateRandomUsername() {
        const uuid = Cypress._.random(0, Math.pow(2, 32));
        const timestamp = new Date().getTime().toString();
        const randomString = Math.random().toString(36).slice(-8);
        return `testuser${timestamp}-${randomString}-${uuid}`;
    }

    generateRandomPassword() {
        const uuid = Cypress._.random(0, Math.pow(2, 32));
        const randomString = Math.random().toString(36).slice(-8);
        return `Test${randomString}-${uuid}!`;
    }
}

export const registerPage = new RegisterPage();