import "./../support/commands.js";

describe("Strona płatności", () => {
  it("Wyświetla sumę produktów oraz poprawne przyciski", () => {
    cy.dodajWszystkoDoKoszykaIPrzejdzDoPlatnosci();

    cy.contains("Payment").should("exist");
    cy.contains("4050 zł").should("exist");
    cy.get("button").contains("Pay").should("be.disabled");
  });

  it("Realizuje płatność po poprawnym wypełnieniu formularza", () => {
    cy.dodajWszystkoDoKoszykaIPrzejdzDoPlatnosci();

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

    cy.get("button").contains("Pay").should("not.be.disabled").click();

    cy.contains("Payment ended successfully: OK").should("exist");

    cy.get(".css-1ldab > :nth-child(1)").contains("Products").click();
    cy.location("pathname").should("eq", "/");
    cy.contains("Basket value: 0 zł").should("not.exist");
  });
});

describe("Walidacja formularza płatności", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/payment");
  });

  it("Pokazuje błąd, gdy imię zawiera niedozwolone znaki", () => {
    cy.get("input[placeholder='Test Testowy']").type("Jan123");
    cy.contains("Name must contain only letters and spaces.").should(
      "be.visible"
    );
  });

  it("Pokazuje błąd, gdy numer karty ma mniej niż 16 cyfr", () => {
    cy.get("input[placeholder='1234567812345678']").type("12345678");
    cy.contains("Card number must be 16 digits.").should("be.visible");
  });

  it("Pokazuje błąd, gdy data ważności jest w złym formacie", () => {
    cy.get("input[placeholder='MM/YY']").type("12025");
    cy.contains("Expiry must be in MM/YY format.").should("be.visible");
  });

  it("Pokazuje błąd, gdy CVV ma mniej niż 3 cyfry", () => {
    cy.get("input[placeholder='123']").type("12");
    cy.contains("CVV must be 3 digits.").should("be.visible");
  });

  it("Nie pokazuje błędów przy poprawnych danych", () => {
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
