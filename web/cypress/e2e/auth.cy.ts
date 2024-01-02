const BASE_URL = "http://localhost:4000/api";

describe("Auth", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("should be able to login", () => {
    cy.intercept("POST", BASE_URL + "/users/login", {
      statusCode: 200,
      body: {
        userDTO: {
          firstName: "Campus",
          lastName: "Campus",
          role: "campus",
        },
      },
    });
    cy.get("input[name=Email]").type("campus@isep.ipp.pt");
    cy.get("input[name=Password]").type("campus");
    cy.get("button[name=login]").click();
    cy.url().should("include", "/");

    cy.get("button[name=logout]").click();
    cy.url().should("include", "/login");
  });

  it("should be able to register a new user", () => {
    cy.intercept("POST", BASE_URL + "/users/login", {
      statusCode: 200,
      body: {
        userDTO: {
          firstName: "Campus",
          lastName: "Campus",
          role: "campus",
        },
      },
    });
    cy.get("input[name=Email]").type("campus@isep.ipp.pt");
    cy.get("input[name=Password]").type("campus");
    cy.get("button[name=login]").click();
    cy.url().should("include", "/");

    cy.get("button[name=logout]").click();
    cy.url().should("include", "/login");
  });

  it("should not be able to click in button when password is empty", () => {
    cy.get("input[name=Email]").type("campus@isep.ipp.pt");
    cy.get("button[name=login]").should("be.disabled");
  });

  it("should not be able to click in button when email is empty", () => {
    cy.get("input[name=Password]").type("campus");
    cy.get("button[name=login]").should("be.disabled");
  });

  it("should not be able to login with invalid credentials", () => {
    cy.intercept("POST", BASE_URL + "/users/login", {
      statusCode: 401,
      body: {
        message: "Invalid credentials",
      },
    });
    cy.get("input[name=Email]").type("dsadas@dssda.com");
    cy.get("input[name=Password]").type("dasdas");
    cy.get("button[name=login]").click();
    cy.get("div[class=swal-modal]").should(
      "contain.text",
      "Invalid email or password"
    );
  });

  it("should not be able to click in submit button with invalid email format", () => {
    cy.get("input[name=Email]").type("campus");
    cy.get("input[name=Password]").type("campus");
    cy.get("button[name=login]").should("be.disabled");
  });

  it("should not be able to click in submit button with invalid email format 2", () => {
    cy.get("input[name=Email]").type("@isep.ipp.pt");
    cy.get("input[name=Password]").type("campus");
    cy.get("button[name=login]").should("be.disabled");
  });
});
