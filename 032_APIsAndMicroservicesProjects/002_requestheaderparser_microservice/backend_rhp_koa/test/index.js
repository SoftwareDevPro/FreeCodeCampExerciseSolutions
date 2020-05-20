

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("request header parser microservice tests", () => {
  after(() => {
    server.close();
  });

  // Invalid URL
  it("invalid url", done => {
    chai
      .request(server)
      .get("/api/whoami/ABC")
      .end((err, res) => {
        
        expect(res).to.have.status(404);
        expect(parseInt(res.headers['content-length'])).to.be.equal(9);
        
        done();
      });
  });

//------------------------------------------------------------------

// Nominal Case
it("nominal case", done => {
    chai
      .request(server)
      .get("/api/whoami")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.undefined;
        expect(res.body.ipaddress).to.not.be.undefined;
        expect(res.body.language).to.not.be.undefined;
        expect(res.body.software).to.not.be.undefined;
        expect(res.headers['content-type']).to.equal("application/json; charset=utf-8");
        expect(parseInt(res.headers['content-length'])).to.not.equal(0);

        done();
      });
  });

});

