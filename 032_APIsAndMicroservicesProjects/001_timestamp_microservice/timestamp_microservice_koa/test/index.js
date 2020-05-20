

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("timestamp microservice tests", () => {
  after(() => {
    server.close();
  });

  it("Invalid date", done => {
    chai
      .request(server)
      .get("/api/timestamp/ZZZ")
      .end((err, res) => {
        
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.undefined;
        expect(res.body.error).to.not.be.undefined;
        expect(res.body.error).to.equal('Invalid Date');
        expect(res.headers['content-type']).to.equal("application/json; charset=utf-8");
        expect(parseInt(res.headers['content-length'])).to.be.equal(29);
        
        done();
      });
  });

  //------------------------------------------------------------------

  it("No supplied date", done => {
    chai
      .request(server)
      .get("/api/timestamp")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.undefined;
        expect(res.body.unix).to.not.be.undefined;
        expect(res.body.utc).to.not.be.undefined;
        expect(res.headers['content-type']).to.equal("application/json; charset=utf-8");
        expect(parseInt(res.headers['content-length'])).to.be.equal(69);

        done();
      });
  });

  //------------------------------------------------------------------

  it("Supplied Date String", done => {
    chai
      .request(server)
      .get("/api/timestamp/2005-12-25")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.undefined;
        expect(res.body.unix).to.not.be.undefined;
        expect(res.body.utc).to.not.be.undefined;
        expect(res.body).to.deep.equal({ unix: 1135468800000, utc: 'Sun, 25 Dec 2005 00:00:00 GMT' });
        expect(res.headers['content-type']).to.equal("application/json; charset=utf-8");
        expect(parseInt(res.headers['content-length'])).to.be.equal(69);

        done();
      });
  });

  //------------------------------------------------------------------

  it("Supplied Date String (in milliseconds)", done => {
    chai
      .request(server)
      .get("/api/timestamp/1135468800000")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.not.be.undefined;
        expect(res.body.unix).to.not.be.undefined;
        expect(res.body.utc).to.not.be.undefined;
        expect(res.body).to.deep.equal({ unix: 1135468800000, utc: 'Sun, 25 Dec 2005 00:00:00 GMT' });
        expect(res.headers['content-type']).to.equal("application/json; charset=utf-8");
        expect(parseInt(res.headers['content-length'])).to.be.equal(69);

        done();
      });
  });

});

