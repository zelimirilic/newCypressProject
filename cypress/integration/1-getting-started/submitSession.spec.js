/// <reference types="cypress" />

describe("Submit session", () => {

    beforeEach(() => {
        cy.clickViewSession();

        cy.url().should('include', '/sessions');
        cy.get('a').contains('Submit a Session!').click();

    })
    
    it('Should navigate to submit session page', () => {
        
        cy.url().should('include', '/sessions/new');

    })

    it('Should navigate to submit session page', () => {
        cy.visit("/conference");
        cy.get('h1').contains('View Sessions').click();

        cy.url().should('include', '/sessions');
        cy.get('a').contains('Submit a Session!').click();
        cy.url().should('include', '/sessions/new');

        cy.get('#inputTitle').type('New session Zeljko');
        cy.get('#inputDescription').type('New decription Zeljko');
        cy.get('#inputDay').type('New day Zeljko');
        cy.get('#inputLevel').type('New level Zeljko');
        cy.get('form').submit();

    })
});