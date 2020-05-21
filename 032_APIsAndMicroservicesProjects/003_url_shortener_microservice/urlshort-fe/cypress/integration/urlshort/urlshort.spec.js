

describe('URL shortener tests', function() {
  
    it("invalid url", function () {

      cy.visit("http://localhost:3001");

      cy.get("#original_url").type("aaa");

      cy.get("#get_url_button").click();

      cy.get("#result").should("contain", "invalid URL");

    });

    it('get a new short url', function() {
      
      cy.visit("http://localhost:3001");

      cy.get("#original_url").type("http://www.google.com");

      cy.get("#get_url_button").click();

      cy.get("#result").should("contain", "original_url");
      cy.get("#result").should("contain", "http://www.google.com");
      cy.get("#result").should("contain", "short_url");


      cy.get("#result").then(($result) => {
        const txt = $result.text();
        cy.writeFile('google_short_url.json', txt); 
      });
  
    });


    it('short url redirects to the original url', function() {

      let gfile = cy.readFile('google_short_url.json').then(json => {

        console.log(json)
        cy.visit("http://localhost:3000/api/shorturl/" + json.short_url);
        cy.url().should('include', 'google');
      
      });
    });

  });
  