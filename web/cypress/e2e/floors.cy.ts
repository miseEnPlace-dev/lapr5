const BASE_URL = "http://localhost:4000/api";

describe("Floors", () => {
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
    cy.visit("/buildings/2/floors");
  });

  it("should be able to list all buildings", () => {
    cy.intercept("GET", BASE_URL + "/buildings/2", {
      statusCode: 200,
      body: {
        code: "B2",
        name: "Building 2",
        description: "description",
        dimensions: {
          width: 8,
          length: 7,
        },
      },
    });

    cy.intercept("GET", BASE_URL + "/buildings/2/floors", {
      statusCode: 200,
      body: [
        {
          code: "B2",
          buildingCode: "B2",
          description: "piso 3",
          dimensions: {
            width: 8,
            length: 7,
          },
        },
        {
          code: "1",
          buildingCode: "B2",
          description: "piso 3",
          dimensions: {
            width: 8,
            length: 7,
          },
        },
      ],
    });

    cy.get("main").get("h2").should("contain", "Floors");
    cy.get("div[aria-label=floors-container")
      .children()
      .should("have.length", 2);
  });

  it("should be able to create a floors", () => {
    cy.intercept("GET", BASE_URL + "/buildings/2", {
      statusCode: 200,
      body: {
        code: "B2",
        name: "Building 2",
        description: "description",
        dimensions: {
          width: 8,
          length: 7,
        },
      },
    });

    cy.intercept("GET", BASE_URL + "/buildings/2/floors", {
      statusCode: 200,
      body: [],
    });
    cy.intercept("POST", BASE_URL + "/buildings/2/floors", {
      statusCode: 201,
      body: {
        floor: {
          code: "1",
          buildingCode: "2",
          description: "piso 3",
          dimensions: {
            width: 8,
            length: 7,
          },
        },
      },
    });

    cy.get("button[name=add-floor]").click();
    cy.get("section[aria-label=modal-overlay]")
      .get("span")
      .should("contain", "Add Floor");

    cy.get("input[name=code]").type("B1");
    cy.get("input[name=width]").type("20");
    cy.get("input[name=length]").type("20");
    cy.get("textarea[name=description]").type("description");
    cy.get("button[name=save]").click();

    cy.get("div[class=swal-modal]").should(
      "contain",
      "Floor saved successfully"
    );
  });

  it("should get error when create floor fails", () => {
    cy.intercept("GET", BASE_URL + "/buildings/2", {
      statusCode: 200,
      body: {
        code: "B2",
        name: "Building 2",
        description: "description",
        dimensions: {
          width: 8,
          length: 7,
        },
      },
    });
    cy.intercept("GET", BASE_URL + "/buildings/2/floors", {
      statusCode: 200,
      body: [],
    });
    cy.intercept("POST", BASE_URL + "/buildings/2/floors", {
      statusCode: 400,
      message: "Error message",
    });

    cy.get("button[name=add-floor]").click();
    cy.get("input[name=code]").type("B1");
    cy.get("input[name=width]").type("20");
    cy.get("input[name=length]").type("20");
    cy.get("textarea[name=description]").type("description");
    cy.get("button[name=save]").click();

    cy.get("div[class=swal-modal]").should("contain", "Error");
  });
});
