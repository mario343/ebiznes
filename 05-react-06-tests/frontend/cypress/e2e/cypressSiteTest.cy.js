//second
describe("Test site", () => {
  it("Visits the Cypress docs", () => {
    cy.visit(
      "https://docs.cypress.io/app/end-to-end-testing/writing-your-first-end-to-end-test"
    );
  });
});
