import "./../support/commands.js";
describe("Strona płatności", () => {
  it("Ma sumę wszystkich produktów", () => {
    cy.dodajWszystkoDoKoszykaIPrzejdzDoPlatnosci();
    cy.contains("Payment").should("exist");
    cy.contains("Sum: 4050 zł").should("not.exist");
    cy.contains("4050 zł").should("exist");
    cy.contains("Pay").should("exist");
    cy.get("button").contains("Pay").should("be.disabled");
  });
});

describe("Walidacja formularza płatności", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/payment");
  });

  it("pokazuje błąd, gdy imię zawiera niedozwolone znaki", () => {
    cy.get("input[placeholder='Test Testowy']").type("Jan123");
    cy.contains("Name must contain only letters and spaces.").should("exist");
  });

  it("pokazuje błąd, gdy numer karty jest krótszy niż 16 cyfr", () => {
    cy.get("input[placeholder='1234567812345678']").type("12345678");
    cy.contains("Card number must be 16 digits.").should("exist");
  });

  it("pokazuje błąd, gdy data wygasa nie jest w formacie MM/YY", () => {
    cy.get("input[placeholder='MM/YY']").type("12025");
    cy.contains("Expiry must be in MM/YY format.").should("exist");
  });

  it("pokazuje błąd, gdy CVV nie ma 3 cyfr", () => {
    cy.get("input[placeholder='123']").type("12");
    cy.contains("CVV must be 3 digits.").should("exist");
  });

  it("nie pokazuje błędów, gdy wszystkie dane są poprawne", () => {
    cy.get("input[placeholder='Test Testowy']").type("Jan Kowalski");
    cy.get("input[placeholder='1234567812345678']").type("1234567812345678");
    cy.get("input[placeholder='MM/YY']").type("12/25");
    cy.get("input[placeholder='123']").type("123");

    cy.contains("Name must contain only letters and spaces.").should(
      "not.exist"
    );
    cy.contains("Card number must be 16 digits.").should("not.exist");
    cy.contains("Expiry must be in MM/YY format.").should("not.exist");
    cy.contains("CVV must be 3 digits.").should("not.exist");
    cy.get("button").contains("Pay").should("be.disabled");
  });
});

describe("Strona płatności", () => {
  it("Ma sumę wszystkich produktów, dane się zgadzają oraz dokonano płatności", () => {
    cy.dodajWszystkoDoKoszykaIPrzejdzDoPlatnosci();
    cy.contains("Payment").should("exist");
    cy.contains("Sum: 4050 zł").should("not.exist");
    cy.contains("4050 zł").should("exist");
    cy.contains("Pay").should("exist");
    cy.get("button").contains("Pay").should("be.disabled");
    cy.get("input[placeholder='Test Testowy']").type("Jan Kowalski");
    cy.get("input[placeholder='1234567812345678']").type("1234567812345678");
    cy.get("input[placeholder='MM/YY']").type("12/25");
    cy.get("input[placeholder='123']").type("123");

    cy.contains("Name must contain only letters and spaces.").should(
      "not.exist"
    );
    cy.contains("Card number must be 16 digits.").should("not.exist");
    cy.contains("Expiry must be in MM/YY format.").should("not.exist");
    cy.contains("CVV must be 3 digits.").should("not.exist");
    cy.get("button").contains("Pay").should("not.be.disabled");
    cy.get("button").contains("Pay").click();
    cy.contains("Payment ended successfully: OK").should("exist");
    cy.get(".css-1ldab > :nth-child(1)").contains("Products").click();
    cy.location("pathname").should("eq", "/");
    cy.contains("Basket value: 0 zł").should("not.exist");
  });
});
