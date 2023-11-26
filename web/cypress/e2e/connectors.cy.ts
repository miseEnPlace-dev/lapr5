const BASE_URL = "http://localhost:4000/api";

describe("Connectors", () => {
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
    cy.visit("/connectors");
  });

  it("should be able to list all connectors", () => {
    cy.intercept("GET", BASE_URL + "/connectors", {
      statusCode: 200,
      body: [
        {
          code: "c2d2",
          floor1Code: "c2",
          floor1BuildingCode: "c",
          floor2Code: "d2",
          floor2BuildingCode: "d",
        },
        {
          code: "c2d3",
          floor1Code: "c2",
          floor1BuildingCode: "c",
          floor2Code: "d3",
          floor2BuildingCode: "d",
        },
      ],
    });

    cy.get("main").get("h1").should("contain", "Connectors");
    cy.get("div[aria-label=connectors-container")
      .children()
      .should("have.length", 2);
  });

  it("should be able to create a connector", () => {
    cy.intercept("GET", BASE_URL + "/connectors", {
      statusCode: 200,
      body: [
        {
          code: "c2d2",
          floor1Code: "c2",
          floor1BuildingCode: "c",
          floor2Code: "d2",
          floor2BuildingCode: "d",
        },
      ],
    });
    cy.intercept("POST", BASE_URL + "/connectors", {
      statusCode: 200,
      body: {
        code: "CBG",
        floor1Code: "B1",
        floor2Code: "G2",
      },
    });

    cy.get("main").get("h1").should("contain", "Connectors");
    cy.get("button[name=createConnector]").should("contain", "+");
    cy.get("button[name=createConnector]").click();
    cy.get("section[aria-label=modal-overlay]")
      .get("span")
      .should("contain", "Create Connector");

    cy.get("input[name=code]").type("CBG");
    cy.get("input[name=floor1Code]").type("B1");
    cy.get("input[name=floor2Code]").type("G2");
    cy.get("button[name=save]").click();

    cy.get("div[class=swal-modal]").should(
      "contain",
      "Connector saved successfully"
    );
  });

  it("should be able to get an error when create a connector fails", () => {
    cy.intercept("GET", BASE_URL + "/connectors", {
      statusCode: 200,
      body: [],
    });
    cy.intercept("POST", BASE_URL + "/connectors", {
      statusCode: 400,
      message: "Error message",
    });

    cy.get("main").get("h1").should("contain", "Connectors");
    cy.get("button[name=createConnector]").should("contain", "+");
    cy.get("button[name=createConnector]").click();
    cy.get("section[aria-label=modal-overlay]")
      .get("span")
      .should("contain", "Create Connector");

    cy.get("input[name=code]").type("CPG");
    cy.get("input[name=floor1Code]").type("B1");
    cy.get("input[name=floor2Code]").type("G3");
    // cy.get("button[name=save]").click();

    // cy.get("div[class=swal-modal]").should("contain", "Error");
  });
});
