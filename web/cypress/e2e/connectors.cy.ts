describe("Connectors", () => {
  const BASE_URL = "http://localhost:4000/api";

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
          code: "A1B1",
          floor1Code: "A1",
          floor1BuildingCode: "A",
          floor2Code: "B1",
          floor2BuildingCode: "B",
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

    cy.get("div[aria-label=connectors-list]")
      .children()
      .should("have.length", 2);
  });

  it("should be able to create a connector", () => {
    const connector = {
      code: "A2B2",
      floor1Code: "A2",
      floor1BuildingCode: "A",
      floor2Code: "B2",
      floor2BuildingCode: "B",
    };

    cy.intercept("GET", BASE_URL + "/connectors", {
      statusCode: 200,
      body: [],
    });
    cy.intercept("POST", BASE_URL + "/connectors", {
      statusCode: 201,
      body: connector,
    });

    cy.get("main").get("h1").should("contain", "Connectors");
    cy.get("button[name=create-connector]").should("contain", "+");

    cy.get("button[name=create-connector]").click();
    cy.get("input[name=code]").type(connector.code);
    cy.get("input[name=floor1code]").type(connector.floor1Code);
    cy.get("input[name=floor2code]").type(connector.floor2Code);
    cy.get("button[name=save]").click();

    cy.get("div[class=swal-modal]").should(
      "contain",
      "Connector saved successfully"
    );
  });

  it("should show the error message when creating fails", () => {
    const errors = "One/both floors do not exist";
    cy.intercept("GET", BASE_URL + "/connectors", {
      statusCode: 200,
      body: [],
    });
    cy.intercept("POST", BASE_URL + "/connectors", {
      statusCode: 400,
      message: "Error message",
      body: { errors },
    });

    cy.get("main").get("h1").should("contain", "Connectors");
    cy.get("button[name=create-connector]").should("contain", "+");

    cy.get("button[name=create-connector]").click();
    cy.get("input[name=code]").type("A2B2");
    cy.get("input[name=floor1code]").type("A2");
    cy.get("input[name=floor2code]").type("B2");
    cy.get("button[name=save]").click();

    cy.get("div[class=swal-modal]").should("contain", "erro");
  });
});
