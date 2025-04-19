import "./../support/commands.js";

describe("Przejście do strony koszyka", () => {
  it("przechodzi do koszyka - sposób pierwszy", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Basket").click();
    cy.location("pathname").should("eq", "/basket");
  });

  it("przechodzi do koszyka - sposób drugi", () => {
    cy.visit("http://localhost:3000");
    cy.get("button").contains("Add").first().click();
    cy.contains("Basket value: 3000 zł").should("exist");
    cy.contains("Basket value").click();
    cy.location("pathname").should("eq", "/basket");
  });
});

// 11th test
describe("Usuwanie z koszyka", () => {
  it("usuwa produkt z koszyka - jeden produkt", () => {
    cy.dodajProduktDoKoszyka();
    cy.contains("Basket value").click();
    cy.location("pathname").should("eq", "/basket");
    cy.contains("Laptop").should("exist");
    cy.get('[aria-label="Close"]').first().click();
    cy.contains("Laptop").should("not.exist");
    cy.contains("Your cart is empty").should("exist");
  });

  it("usuwa dwa produkt z koszyka - majac wiecej w koszyku, ", () => {
    cy.dodajWszystkoDoKoszyka();
    cy.contains("Basket value").click();
    cy.location("pathname").should("eq", "/basket");
    cy.contains("Laptop").should("exist");
    cy.get('[aria-label="Close"]').first().click();
    cy.get('[aria-label="Close"]').first().click();
    cy.contains("Laptop").should("not.exist");
    cy.contains("Your cart is empty").should("not.exist");
    cy.contains("Basket value: 950 zł").should("exist");
    cy.contains("Sum: 950 zł").should("exist");
  });
});

describe("Przechodzi dalej do płatności", () => {
  it("Przechodzi dalej do płatności", () => {
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
});

describe("Przechodzi do pustego koszyka", () => {
  it("Przechodzi do pustego koszyka", () => {
    cy.visit("http://localhost:3000/basket");
    cy.location("pathname").should("eq", "/basket");
    cy.contains("Your cart is empty").should("exist");
    cy.contains("Proceed to payment").should("not.exist");
  });
});
