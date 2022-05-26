/// <reference types="cypress" />

describe("Navigation", () => {
    it('Should navigate to conference session page', () => {
        cy.clickViewSession();

        cy.url().should('include', '/sessions')

    })
});