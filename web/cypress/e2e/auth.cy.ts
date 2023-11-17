describe("Auth", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should be able to login", () => {
    cy.get("input[name=Email]").type("campus@campus.com");
    cy.get("input[name=Password]").type("campus");
    cy.get("button[name=login]").click();
    cy.url().should("include", "/");

    cy.get("button[name=logout]").click();
    cy.url().should("include", "/login");
  });
});
