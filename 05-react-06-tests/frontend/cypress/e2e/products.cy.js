// 3rd - 8th test
describe("Strona produktów", () => {
  it("pokazuje listę produktów", () => {
    cy.visit("http://localhost:3000");
    cy.contains("Add").should("exist");
  });

  it("dodaje produkt do koszyka", () => {
    cy.visit("http://localhost:3000");
    cy.get("button").contains("Add").first().click();
    cy.contains("Basket value: 3000 zł").should("exist");
  });

  it("dodaje ostatni produkt do koszyka", () => {
    cy.visit("http://localhost:3000");
    cy.get(":nth-child(5) > :nth-child(3) > .chakra-button").click();
    cy.contains("Basket value: 50 zł").should("exist");
  });

  it("dodaje każdy produkt do koszyka", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Add").should("exist");

    cy.get("button")
      .filter(':contains("Add")')
      .each(($btn) => {
        cy.wrap($btn).click();
      });

    cy.contains("Basket value: 4050 zł").should("exist");
  });

  it("dodaje każdy produkt do koszyka i przechodzi do koszyka", () => {
    cy.visit("http://localhost:3000");

    cy.contains("Add").should("exist");

    cy.get("button")
      .filter(':contains("Add")')
      .each(($btn) => {
        cy.wrap($btn).click();
      });

    cy.contains("Basket value: 4050 zł").should("exist");

    cy.contains("Basket value").click();

    cy.location("pathname").should("eq", "/basket");
  });
});

describe("Lista produktów - sprawdzenie istnienia tabeli", () => {
  it("pokazuje loader i renderuje tabelę z produktami", () => {
    cy.visit("http://localhost:3000/");

    cy.contains("Loading...").should("exist");

    cy.get("table").should("exist");

    cy.contains("Product").should("exist");
    cy.contains("Price").should("exist");

    cy.get("table tbody tr").should("have.length.at.least", 1);

    cy.get("button").contains("Add").should("exist");
  });
});
