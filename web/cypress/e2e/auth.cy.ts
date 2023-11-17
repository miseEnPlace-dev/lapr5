describe("Auth", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should be able to login", () => {
    cy.get("input[name=Email]").type("campus@campus.com");
    cy.get("input[name=Password]").type("campus");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/");

    cy.get("button[data-testid=logout]").click();
    cy.url().should("include", "/login");
  });
});
