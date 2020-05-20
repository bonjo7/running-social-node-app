const dotenv = require("dotenv");

const app = require("../application.js");
const chai = require("chai");
const chaiHttp = require("chai-http");

dotenv.config();
const ENV = process.env.APP_ENV || "dev";

const { expect } = chai;
chai.use(chaiHttp);

describe("Server!", () => {
  it("Node application is running successfully", (done) => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("Application Launched");
        expect(res.body.message).to.equals(
          "Node application is running successfully" + ENV
        );
        done();
      });
  });
});

  const userCredentials = {
    username: 'sponge@bob.com', 
    password: 'garyTheSnail'
  }

  describe("Login API", function () {
    it("Should success if credential is valid", (done) => {
    var authenticatedUser = request.agent(app);
      this.timeout(50000);
      authenticatedUser
        .post("/lib/routes/auth")
        .set("Accept", "application/json")
        .set("Content-Type", "application/json")
        .send(userCredentials)
        .end(function(err, response){
            expect(response.statusCode).to.equal(200);
            done();
          });
    });
  });

