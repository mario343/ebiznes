describe("Mockowana lista produktów", () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:8080/products", {
      statusCode: 200,
      body: [
        { id: 1, name: "Mock Product 1", price: 1000 },
        { id: 2, name: "Mock Product 2", price: 2000 },
      ],
    }).as("getProducts");
  });

  it("renderuje produkty z mockowanych danych", () => {
    cy.visit("http://localhost:3000/");
    cy.wait("@getProducts");

    cy.contains("Mock Product 1").should("exist");
    cy.contains("Mock Product 2").should("exist");

    cy.get("button").contains("Add").should("exist", 2);
  });

  it("dodaje mockowany produkt do koszyka", () => {
    cy.visit("http://localhost:3000/");
    cy.wait("@getProducts");

    cy.get("button").contains("Add").first().click();
    cy.contains("Basket value: 1000 zł").should("exist");
  });
});
