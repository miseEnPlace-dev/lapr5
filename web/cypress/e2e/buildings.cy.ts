const BASE_URL = "http://localhost:4000/api";

describe("Buildings", () => {
  beforeEach(() => {
    cy.visit("/login");
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
    cy.get("input[name=Email]").type("campus@campus.com");
    cy.get("input[name=Password]").type("campus");
    cy.get("button[name=login]").click();
    localStorage.setItem("token", "token");
    cy.intercept("GET", BASE_URL + "/me", {
      statusCode: 200,
      body: {
        firstName: "Campus",
        lastName: "Campus",
        role: "campus",
      },
    });
    cy.visit("/buildings");
  });

  it("should be able to list all buildings", () => {
    cy.intercept("GET", BASE_URL + "/buildings", {
      statusCode: 200,
      body: [
        {
          code: "B1",
          name: "Building 1",
          maxDimensions: {
            width: 20,
            length: 20,
          },
          description: "description",
        },
      ],
    });
    cy.intercept("POST", BASE_URL + "/buildings", {
      statusCode: 200,
      body: {
        building: {
          code: "B1",
          name: "Building 1",
          maxDimensions: {
            width: 20,
            length: 20,
          },
          description: "description",
        },
      },
    });

    cy.get("main").get("h1").should("contain", "Buildings");
    cy.get("button[name=createBuilding]").should("contain", "+");
    cy.get("button[name=createBuilding]").click();
    cy.get("section[aria-label=modal-overlay]")
      .get("span")
      .should("contain", "Create Building");

    cy.get("input[name=Code]").type("B1");
    cy.get("input[name=Name]").type("Building 1");
    cy.get("input[name=Width]").type("20");
    cy.get("input[name=Length]").type("20");
    cy.get("textarea[name=Description]").type("description");
    cy.get("button[name=save]").click();

    cy.get("div[class=swal-modal]").should(
      "contain",
      "Building saved successfully"
    );
  });
});
