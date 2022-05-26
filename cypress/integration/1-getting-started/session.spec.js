/// <reference types="cypress" />

const fridaySessionsData = {
    data: {
      intro: [
        {
          id: "78170",
          title: "Cypress 9 Fundamentals",
          startsAt: "8:30",
          day: "Friday",
          room: "Jupiter",
          level: "Introductory and overview",
          speakers: [
            {
              id: "37313769-11ae-4245-93b3-e6e60d5d187c",
              name: "Adhithi Ravichandran",
              __typename: "Speaker",
            },
          ],
          __typename: "Session",
        },
        {
          id: "12345",
          title: "GraphQL Fundamentals",
          startsAt: "9:30",
          day: "Friday",
          room: "Jupiter",
          level: "Introductory and overview",
          speakers: [
            {
              id: "37313769-11ae-4245-93b3-e6e60d5d187c",
              name: "Adhithi Ravichandran",
              __typename: "Speaker",
            },
          ],
          __typename: "Session",
        },
      ],
      intermediate: [
        {
          id: "85324",
          title: " Bamboo Spec",
          startsAt: "8:30",
          day: "Friday",
          room: "Io",
          level: "Intermediate",
          speakers: [
            {
              id: "e9c40ccc-1ffd-44f5-90c2-9d69ada76073",
              name: "Benjamin Cox",
              __typename: "Speaker",
            },
          ],
          __typename: "Session",
        },
        {
            id: "6789",
            title:"Zexon files Fundamentals",
            startsAt: "12:30",
            day: "Friday",
            room: "Mars",
            level: "Introductory and overview",
            speakers: [
              {
                id: "37313769-11ae-4245-93b3-e6e60d5d187c",
                name: "Zelimir Ilicn",
                __typename: "Speaker",
              },
            ],
            __typename: "Session",
          },
      ],
      advanced: [
        {
          id: "84969",
          title: "Microservices -- The Hard Way is the right Way",
          startsAt: "9:45",
          day: "Friday",
          room: "Ganymede",
          level: "Advanced",
          speakers: [
            {
              id: "60e31e1b-2d77-4f36-8e11-4d9f8b639bc8",
              name: "Joe Lopez",
              __typename: "Speaker",
            },
          ],
          __typename: "Session",
        },
      ],
    },
  };

describe("Session page", () => {

    beforeEach(() => {
        cy.clickViewSession();

        cy.url().should('include', '/sessions');

    })

    it('Should navigate to conference session page and view day filter buttons', () => {
        cy.get('[data-cy=All]');
        cy.get('[data-cy=Wed]');
        cy.get('[data-cy=Thu]');
        cy.get('[data-cy=Fri]');

    })

    it('Should filter session and display only Friday session when Friday button is clicked', () => {
        cy.intercept('POST', 'http://localhost:4000/graphql', fridaySessionsData).as('getInfo');
        cy.get('[data-cy=Fri]').click();
        cy.wait('@getInfo');

        cy.get('[data-cy=day]').should('have.length', 5);
        cy.get('[data-cy=day]').contains('Friday')
        cy.get('[data-cy=day]').contains('Friday').should('be.visible');
        cy.get('[data-cy=day]').contains('Thu').should('not.exist');
        cy.get('[data-cy=day]').contains('All').should('not.exist');

    })

    it('Should filter session and display only Thursday session when Thursday button is clicked', () => {
        cy.intercept('POST', 'http://localhost:4000/graphql', {fixture: 'session.json',}).as('getInfo');
        cy.get('[data-cy=Thu]').click();
        cy.wait('@getInfo');

        cy.get('[data-cy=day]').should('have.length', 4);
        cy.get('[data-cy=day]').contains('Thursday')
        cy.get('[data-cy=day]').contains('Thursday').should('be.visible');
        cy.get('[data-cy=day]').contains('Thu').should('exist');
        cy.get('[data-cy=day]').contains('All').should('not.exist');

    })
});