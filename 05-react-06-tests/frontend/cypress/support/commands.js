Cypress.Commands.add("dodajProduktDoKoszyka", () => {
  cy.visit("http://localhost:3000");
  cy.get("button").contains("Add").first().click();
  cy.contains("Basket value: 3000 zł").should("exist");
});

Cypress.Commands.add("dodajWszystkoDoKoszyka", () => {
  cy.visit("http://localhost:3000");

  cy.contains("Add").should("exist");

  cy.get("button")
    .filter(':contains("Add")')
    .each(($btn) => {
      cy.wrap($btn).click();
    });

  cy.contains("Basket value: 4050 zł").should("exist");
});

Cypress.Commands.add("dodajWszystkoDoKoszykaIPrzejdzDoPlatnosci", () => {
  cy.dodajWszystkoDoKoszyka();
  cy.contains("Basket value").click();
  cy.location("pathname").should("eq", "/basket");
  cy.contains("Laptop").should("exist");
  cy.contains("Screen").should("exist");
  cy.contains("Keyboard").should("exist");
  cy.contains("Accessory").should("exist");
  cy.contains("Basket value: 4050 zł").should("exist");
  cy.contains("Your cart is empty").should("not.exist");
  cy.contains("Proceed to payment").should("exist");
  cy.contains("Proceed to payment").click();
  cy.location("pathname").should("eq", "/payment");
});
